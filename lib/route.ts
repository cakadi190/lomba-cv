import { RouteError } from "@/exceptions/RouteError";

/**
 * Pemetaan terpusat nama rute aplikasi ke pola URL-nya.
 *
 * Segmen dinamis ditulis dengan awalan titik dua (`:nama`), mis. `:id`, `:slug`,
 * dan akan diganti oleh argumen `params` saat memanggil {@link route}.
 *
 * @example
 * ROUTES["portfolios.show"] // "/portofolio/:slug"
 */
export const ROUTES = {
  home: "/",

  "company.index": "/company",
  "company.about.index": "/company/about",
  "company.about.brand": "/company/brand-guidelines",

  "portfolios.index": "/portofolio",
  "portfolios.show": "/portofolio/:slug",

  "resources.coffee-shops.index": "/sumber-daya/tempat-ngopi",

  contact: "/contact",
} as const;

/** Gabungan seluruh nama rute yang valid pada {@link ROUTES}. */
export type RouteName = keyof typeof ROUTES;

/** Tipe nilai yang dapat dipakai sebagai parameter rute. */
export type RouteParamValue = string | number | boolean;

/** Kumpulan parameter rute, baik untuk segmen path maupun query string. */
export type RouteParams =
  | Record<string, RouteParamValue | RouteParamValue[] | null | undefined>
  | RouteParamValue
  | Array<
      | RouteParamValue
      | Record<string, RouteParamValue | RouteParamValue[] | null | undefined>
    >;

/**
 * Bentuk fungsi pemanggil {@link route} — sebuah callable yang juga
 * mengekspos seluruh method introspeksi milik {@link Router}.
 */
export interface RouteFn {
  (name: RouteName, params?: RouteParams, absolute?: boolean): string;
  current(): RouteName | undefined;
  is(...patterns: string[]): boolean;
  has(name: string): name is RouteName;
  params(): Record<string, string>;
}

/**
 * Router terpusat ala Laravel — bertanggung jawab membentuk URL dari nama rute
 * sekaligus melakukan introspeksi terhadap rute yang sedang aktif.
 *
 * Biasanya tidak dipakai langsung; gunakan instance siap pakai {@link route}.
 */
export class Router {
  /** Daftar pola rute yang dikelola router ini. */
  private readonly routes: Record<RouteName, string>;

  /**
   * @param routes  Pemetaan nama rute ke pola URL.
   * @param baseUrl Basis URL untuk pembentukan URL absolut.
   */
  constructor(
    routes: Record<RouteName, string>,
    private readonly baseUrl: string = Router.resolveBaseUrl(),
  ) {
    this.routes = routes;
  }

  /**
   * Basis URL default: dari env publik bila ada, jika tidak dari
   * `window.location.origin` saat di browser, atau string kosong di server.
   */
  static resolveBaseUrl(): string {
    return (
      process.env.NEXT_PUBLIC_APP_URL ??
      (typeof window === "undefined" ? "" : window.location.origin)
    );
  }

  /** `pathname` aktif; string kosong saat dijalankan di server. */
  private static currentPath(): string {
    return typeof window === "undefined" ? "" : window.location.pathname;
  }

  /** Meng-escape karakter khusus regex pada sebuah literal string. */
  private static escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /**
   * Mengubah pola rute (`/admin/users/:id`) menjadi RegExp dengan named group,
   * sehingga path konkret dapat dicocokkan sekaligus diekstrak parameternya.
   */
  private static patternToRegExp(pattern: string): RegExp {
    const source = pattern
      .split("/")
      .map((segment) =>
        segment.startsWith(":")
          ? `(?<${segment.slice(1)}>[^/]+)`
          : Router.escapeRegExp(segment),
      )
      .join("/");

    return new RegExp(`^${source}/?$`);
  }

  /**
   * Mengubah pola wildcard ala Laravel (`admin.users.*`) menjadi RegExp.
   * Tanda `*` mewakili "apa pun", selain itu dicocokkan secara literal.
   */
  private static wildcardToRegExp(pattern: string): RegExp {
    const source = pattern.split("*").map(Router.escapeRegExp).join(".*");
    return new RegExp(`^${source}$`);
  }

  /**
   * Membangun URL dari nama rute terdaftar — mirip helper `route()` Laravel.
   *
   * Aturan pengisian `params`:
   * - Kunci yang cocok dengan placeholder `:key` menggantikan segmen tersebut.
   * - Kunci sisanya otomatis menjadi **query string**.
   * - Nilai di-encode dengan {@link encodeURIComponent}.
   *
   * @param name     Nama rute yang ada pada {@link ROUTES}.
   * @param params   Nilai untuk segmen dinamis dan/atau query string.
   * @param absolute Bila `true`, hasil diawali base URL.
   * @returns URL final yang siap dipakai.
   * @throws {RouteError} Jika nama rute tidak terdaftar atau segmen wajib kosong.
   *
   * @example
   * router.generate("portfolios.show", { slug: "foo" });       // "/portfolios/foo"
   * router.generate("portfolios.index", { page: 2, q: "a" });  // "/portfolios?page=2&q=a"
   */
  generate(
    name: RouteName,
    params: RouteParams = {},
    absolute = false,
  ): string {
    let uri: string | undefined = this.routes[name];
    if (uri === undefined) {
      throw new RouteError("Nama rute tidak atau belum terdefinisi.");
    }

    // Cari semua placeholder segmen dinamis (seperti :slug, :id)
    const placeholders = uri.match(/:[A-Za-z0-9_]+/g) || [];
    const resolvedParams: Record<string, unknown> = {};

    if (Array.isArray(params)) {
      let placeholderIdx = 0;
      for (let i = 0; i < params.length; i++) {
        const item = params[i];
        // Jika elemen terakhir berupa objek, gabungkan ke parameter query
        if (
          i === params.length - 1 &&
          typeof item === "object" &&
          item !== null &&
          !Array.isArray(item)
        ) {
          Object.assign(resolvedParams, item);
        } else if (placeholderIdx < placeholders.length) {
          const key = placeholders[placeholderIdx].slice(1);
          resolvedParams[key] = item;
          placeholderIdx++;
        } else {
          // Elemen sisa tanpa placeholder segmen yang cocok dimasukkan ke query
          resolvedParams[String(i)] = item;
        }
      }
    } else if (typeof params === "object" && params !== null) {
      Object.assign(resolvedParams, params);
    } else if (params !== undefined && params !== null) {
      // Jika bernilai primitif tunggal, petakan ke segmen rute pertama
      if (placeholders.length > 0) {
        const key = placeholders[0].slice(1);
        resolvedParams[key] = params;
      } else {
        resolvedParams["0"] = params;
      }
    }

    const query = new URLSearchParams();

    for (const [key, value] of Object.entries(resolvedParams)) {
      const placeholder = `:${key}`;

      if (uri.includes(placeholder)) {
        if (value === undefined || value === null) {
          throw new RouteError(
            `Parameter rute wajib "${key}" tidak terisi untuk rute "${name}".`,
          );
        }
        uri = uri.replace(placeholder, encodeURIComponent(String(value)));
      } else if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (item !== undefined && item !== null) {
              query.append(`${key}[${index}]`, String(item));
            }
          });
        } else {
          query.append(key, String(value));
        }
      }
    }

    const missing = uri.match(/:[A-Za-z0-9_]+/);
    if (missing) {
      throw new RouteError(
        `Parameter rute wajib "${missing[0].slice(1)}" tidak terisi untuk rute "${name}".`,
      );
    }

    const queryString = query.toString();
    if (queryString) uri += `?${queryString}`;

    return absolute ? `${this.baseUrl}${uri}` : uri;
  }

  /**
   * Nama rute yang cocok dengan `pathname` aktif, atau `undefined` bila tidak ada.
   * Setara dengan `Route::currentRouteName()` di Laravel.
   */
  current(): RouteName | undefined {
    const path = Router.currentPath();
    return (Object.keys(this.routes) as RouteName[]).find((name) =>
      Router.patternToRegExp(this.routes[name]).test(path),
    );
  }

  /**
   * Mengecek apakah rute aktif cocok dengan salah satu pola wildcard.
   * Setara dengan `request()->routeIs('admin.*')` di Laravel.
   *
   * @param patterns Satu atau lebih pola, mendukung wildcard `*`.
   */
  is(...patterns: string[]): boolean {
    const name = this.current();
    if (!name) return false;
    return patterns.some((pattern) =>
      Router.wildcardToRegExp(pattern).test(name),
    );
  }

  /**
   * Mengecek apakah sebuah nama rute terdaftar.
   * Setara dengan `Route::has()` di Laravel.
   */
  has(name: string): name is RouteName {
    return name in this.routes;
  }

  /**
   * Parameter segmen dinamis yang terekstrak dari `pathname` aktif.
   * Mengembalikan objek kosong bila tidak ada rute yang cocok.
   */
  params(): Record<string, string> {
    const name = this.current();
    if (!name) return {};
    const match = Router.patternToRegExp(this.routes[name]).exec(
      Router.currentPath(),
    );
    return { ...match?.groups };
  }

  /**
   * Menghasilkan callable `route()` yang terikat ke instance ini sekaligus
   * mengekspos seluruh method introspeksinya — gaya helper Laravel.
   */
  toFunction(): RouteFn {
    const fn = (name: RouteName, params?: RouteParams, absolute?: boolean) =>
      this.generate(name, params, absolute);

    return Object.assign(fn, {
      current: () => this.current(),
      is: (...patterns: string[]) => this.is(...patterns),
      has: (name: string): name is RouteName => this.has(name),
      params: () => this.params(),
    });
  }
}

/** Instance Router tunggal untuk seluruh aplikasi. */
export const router = new Router(ROUTES);

/**
 * Helper rute siap pakai — callable ala `route()` Laravel sekaligus facade.
 *
 * @example
 * route("portfolios.show", { slug: "foo" }); // "/portfolios/foo"
 * route.current();                           // "portfolios.show"
 * route.is("portfolios.*");                  // true
 * route.has("home");                         // true
 * route.params();                            // { slug: "foo" }
 */
export const route: RouteFn = router.toFunction();

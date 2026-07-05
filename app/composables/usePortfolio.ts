import { type MaybeRefOrGetter, toValue } from "vue";
import { route } from "~~/lib/route";

export interface Portfolio {
  id: string | number;
  name: string;
  slug: string;
  shortDesc: string;
  image: string;
  [key: string]: unknown;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPage: number;
  totalData: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  code?: number;
}

export function usePortfoliosList(page: MaybeRefOrGetter<number>) {
  return useFetch<PaginatedResponse<Portfolio>>(
    () => route("api.portfolios.index", { page: toValue(page) }),
    {
      method: "GET",
      lazy: true,
      server: false,
    },
  );
}

export function usePortfolioDetails(slug: MaybeRefOrGetter<string>) {
  return useFetch<Portfolio>(
    () => route("api.portfolios.show", { slug: toValue(slug) }),
    {
      method: "GET",
      transform: (res: unknown) => (res as { data: Portfolio })?.data,
      server: true,
      lazy: false,
    },
  );
}

export function usePortfolioTotalCount() {
  return useFetch<number>(route("api.portfolios.index"), {
    method: "GET",
    transform: (res: unknown) => (res as { totalData: number })?.totalData,
    server: true,
    lazy: false,
  });
}

import { type ComputedRef, computed, isRef, type Ref, unref } from "vue";

export type SeoMetadata = {
  title: string | Ref<string> | ComputedRef<string> | (() => string);
  description?: string | Ref<string> | ComputedRef<string> | (() => string);
  keyword?:
    | string
    | string[]
    | Ref<string | string[]>
    | ComputedRef<string | string[]>
    | (() => string | string[]);
  image?: string | Ref<string> | ComputedRef<string> | (() => string);
  type?:
    | "website"
    | "article"
    | "book"
    | "profile"
    | "music.song"
    | "music.album"
    | "music.playlist"
    | "music.radio_station"
    | "video.movie"
    | "video.episode"
    | "video.tv_show"
    | "video.other"
    | "payment.link";
  canonical?: string | Ref<string> | ComputedRef<string> | (() => string);
  schemaType?:
    | "WebPage"
    | "ProfilePage"
    | "CollectionPage"
    | "ContactPage"
    | "CreativeWork";
  noindex?: boolean;
  nofollow?: boolean;
};

export function usePageSeo(metadata: SeoMetadata) {
  const config = useRuntimeConfig();
  const requestUrl = useRequestURL();
  const configuredUrl = String(config.public.baseUrl || "");
  const siteUrl = (
    configuredUrl && !configuredUrl.includes("localhost")
      ? configuredUrl
      : requestUrl.origin
  ).replace(/\/+$/, "");

  const resolveValue = <T>(
    val: T | Ref<T> | ComputedRef<T> | (() => T),
  ): Ref<T> | ComputedRef<T> | T => {
    if (isRef(val)) {
      return val;
    }
    if (typeof val === "function") {
      return computed(val as () => T);
    }
    return val;
  };

  const title = resolveValue(metadata.title);
  const description = metadata.description
    ? resolveValue(metadata.description)
    : undefined;

  const rawImage = resolveValue(metadata.image || "/images/meta-image.png");
  const image = computed(() => {
    const value = unref(rawImage);
    return new URL(value, `${siteUrl}/`).toString();
  });

  const canonical = computed(() => {
    const value = metadata.canonical
      ? unref(resolveValue(metadata.canonical))
      : requestUrl.pathname;
    const canonicalUrl = new URL(value, `${siteUrl}/`);
    canonicalUrl.hash = "";
    canonicalUrl.search = "";
    return canonicalUrl.toString();
  });

  const structuredData = computed(() => {
    if (metadata.noindex) return undefined;

    const pageTitle = unref(title);
    const pageDescription = description ? unref(description) : undefined;
    const pageUrl = canonical.value;
    const personId = `${siteUrl}/#person`;
    const websiteId = `${siteUrl}/#website`;
    const pageId = `${pageUrl}#webpage`;
    const pathSegments = new URL(pageUrl).pathname.split("/").filter(Boolean);
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: `${siteUrl}/`,
      },
      ...pathSegments.map((segment, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name:
          index === pathSegments.length - 1
            ? pageTitle
            : segment
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
        item: new URL(
          `/${pathSegments.slice(0, index + 1).join("/")}`,
          siteUrl,
        ).toString(),
      })),
    ];

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": personId,
          name: "Amir Zuhdi Wibowo",
          alternateName: "Mas Adi",
          url: `${siteUrl}/tentang/saya`,
          image: {
            "@type": "ImageObject",
            url: new URL("/images/fotoku.min.png", siteUrl).toString(),
          },
          jobTitle: "Fullstack Web Developer",
          sameAs: [
            "https://www.facebook.com/cakadi190",
            "https://www.instagram.com/cakadi190",
            "https://www.linkedin.com/in/cakadi190",
            "https://www.twitter.com/cakadi190",
          ],
        },
        {
          "@type": "WebSite",
          "@id": websiteId,
          url: `${siteUrl}/`,
          name: "Mas Adi",
          alternateName: "Catatan Mas Adi",
          inLanguage: "id-ID",
          publisher: { "@id": personId },
        },
        {
          "@type": metadata.schemaType || "WebPage",
          "@id": pageId,
          url: pageUrl,
          name: pageTitle,
          description: pageDescription,
          image: image.value,
          inLanguage: "id-ID",
          isPartOf: { "@id": websiteId },
          author: { "@id": personId },
          ...(metadata.schemaType === "ProfilePage"
            ? { mainEntity: { "@id": personId } }
            : {}),
          breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          itemListElement: breadcrumbItems,
        },
      ],
    };
  });

  const keywords = computed(() => {
    const rawKeywords =
      typeof metadata.keyword === "function"
        ? (metadata.keyword as () => string | string[])()
        : unref(metadata.keyword);
    if (Array.isArray(rawKeywords)) {
      return rawKeywords.join(", ");
    }
    return rawKeywords || "";
  });

  const robots = computed(() => {
    const parts = [];
    if (metadata.noindex) parts.push("noindex");
    if (metadata.nofollow) parts.push("nofollow");
    if (parts.length > 0) return parts.join(", ");
    return "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  });

  useSeoMeta({
    title,
    ogTitle: title,
    twitterTitle: title,
    description,
    ogDescription: description,
    twitterDescription: description,
    ogImage: image,
    twitterImage: image,
    twitterCard: "summary_large_image",
    ogUrl: canonical,
    ogType: metadata.type || "website",
    ogSiteName: "Mas Adi",
    ogLocale: "id_ID",
    twitterCreator: "@cakadi190",
  });

  // Use useHead for non-og/twitter meta elements like keywords, robots, canonical link
  useHead({
    meta: [
      {
        name: "keywords",
        content: keywords,
      },
      {
        name: "robots",
        content: robots,
      },
    ],
    link: [
      {
        rel: "canonical",
        href: canonical,
      },
    ],
    script: structuredData.value
      ? [
          {
            type: "application/ld+json",
            innerHTML: computed(() => JSON.stringify(structuredData.value)),
          },
        ]
      : [],
  });
}

export default usePageSeo;

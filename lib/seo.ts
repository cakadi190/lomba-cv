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
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
};

export function usePageSeo(metadata: SeoMetadata) {
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

  const rawImage = metadata.image || "/images/meta-image.png";
  const image = resolveValue(rawImage);

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
    return parts.length > 0 ? parts.join(", ") : undefined;
  });

  const urlRequest = useRequestURL();

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
    ogUrl: computed(() => urlRequest.href),
    ogType: metadata.type || "website",
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
    link: metadata.canonical
      ? [
          {
            rel: "canonical",
            href: metadata.canonical,
          },
        ]
      : [],
  });
}

export default usePageSeo;

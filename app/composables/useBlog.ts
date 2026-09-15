import { type MaybeRefOrGetter, toValue } from "vue";
import { route } from "~~/lib/route";
import type { PaginatedResponse } from "./usePortfolio";

export interface PostCategory {
  id: string | number;
  name: string;
  color: string | null;
}

export interface Post {
  id: string | number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  tags: string[];
  publishedAt: string | null;
  categories: PostCategory[];
  [key: string]: unknown;
}

export function usePostsList(page: MaybeRefOrGetter<number>) {
  return useFetch<PaginatedResponse<Post>>(
    () => route("api.blog.index", { page: toValue(page) }),
    {
      method: "GET",
      lazy: true,
      server: false,
    },
  );
}

export function usePostDetails(slug: MaybeRefOrGetter<string>) {
  return useFetch<Post>(() => route("api.blog.show", { slug: toValue(slug) }), {
    method: "GET",
    transform: (res: unknown) => (res as { data: Post })?.data,
    server: true,
    lazy: false,
  });
}

export function useLatestPosts(limit = 3) {
  return useFetch<PaginatedResponse<Post>>(
    () => route("api.blog.index", { perPage: limit, page: 1 }),
    {
      method: "GET",
      lazy: true,
      server: false,
    },
  );
}

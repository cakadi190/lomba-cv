import { type MaybeRefOrGetter, toValue } from "vue";
import { route } from "~~/lib/route";
import type { PaginatedResponse } from "./usePortfolio";

export interface CoffeeShop {
  id: string | number;
  name: string;
  [key: string]: unknown;
}

export interface RegionResponse {
  data: string[];
  [key: string]: unknown;
}

export function useCoffeeRegions() {
  return useFetch<RegionResponse>(route("api.coffee-shops.region"), {
    method: "GET",
    server: false,
  });
}

export function useCoffeeShops(params: {
  page: MaybeRefOrGetter<number>;
  city: MaybeRefOrGetter<unknown>;
  placeName: MaybeRefOrGetter<unknown>;
}) {
  return useFetch<PaginatedResponse<CoffeeShop>>(
    () => {
      const pageVal = toValue(params.page);
      const cityVal = toValue(params.city);
      const placeNameVal = toValue(params.placeName);

      const queryParams: Record<
        string,
        string | number | boolean | null | undefined
      > = {
        page: pageVal,
      };

      if (cityVal) {
        const cityValue = Array.isArray(cityVal) ? cityVal[0] : cityVal;
        if (
          typeof cityValue === "string" ||
          typeof cityValue === "number" ||
          typeof cityValue === "boolean"
        ) {
          queryParams.city = cityValue;
        }
      }

      if (placeNameVal) {
        const nameStr = Array.isArray(placeNameVal)
          ? placeNameVal[0]
          : placeNameVal;
        if (
          typeof nameStr === "string" ||
          typeof nameStr === "number" ||
          typeof nameStr === "boolean"
        ) {
          queryParams.placeName = nameStr;
        }
      }

      return route("api.coffee-shops.index", queryParams);
    },
    {
      method: "GET",
      lazy: true,
      server: false,
    },
  );
}

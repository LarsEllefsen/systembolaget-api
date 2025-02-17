import { CategoryOptions } from "../types";
import { GET } from "../utils/GET";
import {
  categoryToCategoryLevel1Map,
  mapToPagination,
  mapToSearchProduct,
  subCategoryToCategoryLevel2Map,
} from "./mapper";

const PRODUCT_SEARCH_URL = "/productsearch/search";

type ProductSearchResultDTO = {
  metadata: SearchMetadataDTO;
  products: SearchProductDTO[];
};

export type SearchMetadataDTO = {
  totalPages: number;
  nextPage: number;
  previousPage: number;
  docCount: number;
  fullAssortmentDocCount: number;
};

export type SearchProductDTO = {
  productId: string;
  productNumber: string;
  productNameBold: string;
  productNameThin: string | null;
  producerName: string;
  alcoholPercentage: number;
  volumeText: string;
  volume: number;
  price: number;
  country: string;
  categoryLevel1: string;
  categoryLevel2: string | null;
  categoryLevel3: string | null;
  categoryLevel4: string | null;
  images: { imageUrl: string }[];
};

export type SearchProductsOptions = {
  page?: number;
  size?: number;
  category?: CategoryOptions;
  store?: string;
};

const getSearchParams = (options?: SearchProductsOptions): URLSearchParams => {
  const searchParams = new URLSearchParams({
    page: options?.page ? options.page.toString() : "1",
    size: options?.size ? options.size.toString() : "30",
    sortBy: "Score",
    sortDirection: "Ascending",
  });

  if (options?.store !== undefined) {
    searchParams.append("storeId", options.store);
  }

  if (
    options?.category !== undefined &&
    categoryToCategoryLevel1Map.has(options.category.category)
  ) {
    searchParams.append(
      "categoryLevel1",
      categoryToCategoryLevel1Map.get(options.category.category)!!
    );
    if (
      options.category.subCategory !== undefined &&
      subCategoryToCategoryLevel2Map.has(options.category.subCategory)
    ) {
      searchParams.append(
        "categoryLevel2",
        subCategoryToCategoryLevel2Map.get(options.category.subCategory)!!
      );
    }
  }

  return searchParams;
};

export const searchProducts = async (
  apiKey: string,
  options?: SearchProductsOptions
) => {
  const searchResult = await GET<ProductSearchResultDTO>(
    PRODUCT_SEARCH_URL,
    apiKey,
    getSearchParams(options)
  );

  return {
    products: searchResult.products.map(mapToSearchProduct),
    pagination: mapToPagination(searchResult.metadata),
  };
};

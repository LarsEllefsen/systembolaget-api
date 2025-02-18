import {
  ALCOHOL_FREE_CATEGORY,
  AlcoholFreeSubCategory,
  BEER_CATEGORY,
  BeerSubCategories,
  CIDER_AND_MIXED_DRINKS_CATEGORY,
  CiderAndMixedDrinksSubCategories,
  LIQUOR_CATEGORY,
  LiquorSubCategories,
  WINE_CATEGORY,
  WineSubCategories,
} from "./constants";

export type CategoryOptions =
  | {
      category: typeof BEER_CATEGORY;
      subCategory: (typeof BeerSubCategories)[keyof typeof BeerSubCategories];
    }
  | {
      category: typeof WINE_CATEGORY;
      subCategory: (typeof WineSubCategories)[keyof typeof WineSubCategories];
    }
  | {
      category: typeof LIQUOR_CATEGORY;
      subCategory: (typeof LiquorSubCategories)[keyof typeof LiquorSubCategories];
    }
  | {
      category: typeof CIDER_AND_MIXED_DRINKS_CATEGORY;
      subCategory: (typeof CiderAndMixedDrinksSubCategories)[keyof typeof CiderAndMixedDrinksSubCategories];
    }
  | {
      category: typeof ALCOHOL_FREE_CATEGORY;
      subCategory: (typeof AlcoholFreeSubCategory)[keyof typeof AlcoholFreeSubCategory];
    };

export type SearchResults = {
  products: SearchProduct[];
  pagination: Pagination;
};

export type SearchProduct = {
  productId: string;
  productName: string;
  productNumber: string;
  brewery: string;
  country: string;
  price: number;
  abv: number;
  volume: {
    value: number;
    unit: string;
    formattedString: string;
  };
  category: string;
  subCategory: string | null;
};

export type Pagination = {
  currentPage: number;
  prevPage: number;
  nextPage: number;
  totalPages: number;
  pageSize: number;
};

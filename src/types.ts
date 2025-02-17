import {
  BEER_CATEGORY,
  BeerSubCategories,
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

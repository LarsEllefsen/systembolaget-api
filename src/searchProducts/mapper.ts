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
} from "../constants";
import { Pagination, SearchProduct } from "../types";
import { SearchMetadataDTO, SearchProductDTO } from "./searchProducts";

const getProductName = (dto: SearchProductDTO): string => {
  return `${dto.productNameBold} ${dto.productNameThin ?? ""}`;
};

const getVolume = (dto: SearchProductDTO) => {
  return {
    value: dto.volume,
    unit: dto.volumeText.split(" ")[1],
    formattedString: dto.volumeText,
  };
};

export const mapToSearchProduct = (dto: SearchProductDTO): SearchProduct => {
  return {
    productId: dto.productId,
    productName: getProductName(dto),
    brewery: dto.producerName,
    abv: dto.alcoholPercentage,
    category: dto.categoryLevel1,
    subCategory: dto.categoryLevel2,
    country: dto.country,
    price: dto.price,
    productNumber: dto.productNumber,
    volume: getVolume(dto),
  } satisfies SearchProduct;
};

export const mapToPagination = (metadata: SearchMetadataDTO) => {
  return {
    currentPage: metadata.nextPage - 1,
    nextPage: metadata.nextPage,
    prevPage: metadata.previousPage,
    pageSize: metadata.docCount / metadata.totalPages,
    totalPages: metadata.totalPages,
  } satisfies Pagination;
};

export const categoryToCategoryLevel1Map = new Map([
  [BEER_CATEGORY, "Öl"],
  [WINE_CATEGORY, "Vin"],
  [LIQUOR_CATEGORY, "Sprit"],
  [CIDER_AND_MIXED_DRINKS_CATEGORY, "Cider & Blanddryck"],
  [ALCOHOL_FREE_CATEGORY, "Alkoholfritt"],
]);

type SubCategoryKeys =
  | (typeof WineSubCategories)[keyof typeof WineSubCategories]
  | (typeof BeerSubCategories)[keyof typeof BeerSubCategories]
  | (typeof LiquorSubCategories)[keyof typeof LiquorSubCategories]
  | (typeof AlcoholFreeSubCategory)[keyof typeof AlcoholFreeSubCategory]
  | (typeof CiderAndMixedDrinksSubCategories)[keyof typeof CiderAndMixedDrinksSubCategories];

export const subCategoryToCategoryLevel2Map: Map<SubCategoryKeys, string> =
  new Map([
    [WineSubCategories.RedWine, "Rött vin"],
    [WineSubCategories.WhiteWine, "Vitt vin"],
    [WineSubCategories.SparklingWine, "Mousserande vin"],
    [WineSubCategories.RoseWine, "Rosévin"],
    [WineSubCategories.WineBox, "Vinlåda"],
    [WineSubCategories.FortifiedWine, "Starkvin"],
    [WineSubCategories.FlavoredAndFruitWine, "Smaksatt vin & fruktvin"],
    [WineSubCategories.MulledWine, "Glögg och Glühwein"],
    [WineSubCategories.Vermouth, "Vermouth"],
    [WineSubCategories.Sake, "Sake"],
    [WineSubCategories.Aperitivo, "Aperitifer"],
    [BeerSubCategories.Ale, "Ale"],
    [BeerSubCategories.DarkLager, "Mellanmörk & Mörk lager"],
    [BeerSubCategories.Lager, "Ljus lager"],
    [BeerSubCategories.PorterAndSout, "Porter & Stout"],
    [BeerSubCategories.Wheat, "Veteöl"],
    [BeerSubCategories.Sour, "Syrlig öl"],
    [LiquorSubCategories.Whisky, "Whisky"],
    [LiquorSubCategories.Liqueur, "Likör"],
    [LiquorSubCategories.Gin, "Gin & Genever"],
    [LiquorSubCategories.Aquavit, "Akvavit & Krydrat brännvin"],
    [LiquorSubCategories.Cognac, "Cognac"],
    [LiquorSubCategories.Rum, "Rom & Lagrad sockerrörssprit"],
    [LiquorSubCategories.Vodka, "Vodka & Okryddat brännvin"],
    [LiquorSubCategories.Grappa, "Grappa & Marc"],
    [LiquorSubCategories.Tequila, "Tequila & Mezcal"],
    [LiquorSubCategories.ArmagnacAndBrandy, "Armagnac & Brandy"],
    [LiquorSubCategories.FlavoredLiquor, "Smaksatt sprit"],
    [LiquorSubCategories.FruitLiquor, "Frukt & Druvsprit"],
    [LiquorSubCategories.Bitter, "Bitter"],
    [LiquorSubCategories.Calvados, "Calvados"],
    [LiquorSubCategories.DrinksAndCocktails, "Drinkar & Cocktails"],
    [LiquorSubCategories.AniseLiquor, "Anissprit"],
    [LiquorSubCategories.Punch, "Punsch"],
    [LiquorSubCategories.MixedSet, "Sprit av flera typer"],
    [LiquorSubCategories.Aperitivo, "Aperitif & Bitter"],
    [AlcoholFreeSubCategory.Beer, "Öl"],
    [AlcoholFreeSubCategory.Sparkling, "Mousserande"],
    [AlcoholFreeSubCategory.CiderAndMixedDrinks, "Cider & Blanddryck"],
    [
      AlcoholFreeSubCategory.MulledWineAndChristmasDrinks,
      "Glögg & andra juldrycker",
    ],
    [AlcoholFreeSubCategory.Must, "Must"],
    [AlcoholFreeSubCategory.DrinksAndCocktails, "Drinkar & Cocktail"],
    [AlcoholFreeSubCategory.RedWine, "Rött vin"],
    [AlcoholFreeSubCategory.WhiteWine, "Vitt vin"],
    [AlcoholFreeSubCategory.Rose, "Rosévin"],
    [AlcoholFreeSubCategory.Avec, "Avec"],
    [AlcoholFreeSubCategory.Schnaps, "Schnaps"],
    [CiderAndMixedDrinksSubCategories.Cider, "Cider"],
    [CiderAndMixedDrinksSubCategories.MixedDrinks, "Blanddryck"],
  ]);

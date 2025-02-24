import { getApiKey } from "./credentials";
import { ForbiddenError } from "./errors/ForbiddenError";
import getStockBalance, {
  getStockBalanceOptions,
} from "./getStockBalance/getStockBalance";
import { getStores } from "./getStores/index";
import { SearchProductsOptions, searchProducts } from "./searchProducts/index";
import { SearchProductWithStock, SearchResultsWithStock } from "./types";

export default class Client {
  private apiKey: string;

  constructor(apiKey: string) {
    console.debug("Initialized new systembolaget-api client");
    this.apiKey = apiKey;
  }

  async searchProducts(options?: SearchProductsOptions) {
    return this.withApiKeyCache(searchProducts, options);
  }

  async getStores() {
    return this.withApiKeyCache(getStores);
  }

  async getStockBalance(productId: string, storeId: string) {
    return this.withApiKeyCache(getStockBalance, {
      productId,
      storeId,
    } satisfies getStockBalanceOptions);
  }

  /**
   * A specialized version of searchProducts that searches for products in stock in a given store.
   * Differs from searchProducts with storeId option as this does an additional request to fetch stock balance for each matched product.
   * @param storeId The ID of the store to search for products in
   * @param options Search options
   */
  async searchProductsInStore(
    storeId: string,
    options?: SearchProductsOptions
  ): Promise<SearchResultsWithStock> {
    const { products, pagination } = await this.searchProducts(options);

    const productsWithStock = await Promise.all(
      products.map(async (product) => {
        const stockBalance = await this.getStockBalance(
          product.productId,
          storeId
        );
        return { ...product, ...stockBalance } satisfies SearchProductWithStock;
      })
    );

    return { pagination, products: productsWithStock };
  }

  private async withApiKeyCache<T>(
    fn: (apiKey: string, arg?: any) => Promise<T>,
    arg?: any
  ): Promise<T> {
    try {
      return fn(this.apiKey, arg);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        this.apiKey = await getApiKey();
        return fn(this.apiKey, arg);
      } else {
        throw error;
      }
    }
  }
}

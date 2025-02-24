import { getApiKey } from "./credentials";
import { ForbiddenError } from "./errors/ForbiddenError";
import getStockBalance, {
  getStockBalanceOptions,
} from "./getStockBalance/getStockBalance";
import { getStores } from "./getStores/index";
import { SearchProductsOptions, searchProducts } from "./searchProducts/index";

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

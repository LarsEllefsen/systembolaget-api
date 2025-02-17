import { getApiKey } from "./credentials";
import { ForbiddenError } from "./errors/ForbiddenError";
import {
  SearchProductsOptions,
  searchProducts,
} from "./searchProducts/searchProducts";

export default class Client {
  private apiKey: string;

  constructor(apiKey: string) {
    console.debug("Initialized new systembolaget-api client");
    this.apiKey = apiKey;
  }

  async searchProducts(options?: SearchProductsOptions) {
    return this.withApiKeyCache(searchProducts, options);
  }

  private async withApiKeyCache<T>(
    fn: (apiKey: string, arg: any) => Promise<T>,
    arg: any
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

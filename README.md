# Systembolaget-api

## Documentation

In order to consume the API you need to instante a new client. This is done through the exported method `newClient` from the `systembolaget-api` package.

Example:

```ts
import { newClient } from "systembolaget-api";

const client = await newClient();
```

It is advised to reuse the same client instance as much as possible, as it caches an API key that is re-fetched for every new client.

### Client

The following documentation examples assume you have a client named `client` instantiated.

### <code>searchProducts(options?: [SearchProductsOptions](#SearchProductsOptions)) : Promise<[SearchResults](#SearchResults)></code>

Searches for products with the given options and returns pagination info and a list of products.
The follow options are:

- page: Which page of the search result to get. Default is 0.
- size: Number of products per page. Default is 30.
- category: Which product categories to search for. Default is all categories.
- store: Which store to search for products in. Default is all stores.

Example:

```ts
const products = await client.searchProducts({
  category: {
    category: "Beer",
    subCategory: "PorterAndStout",
  },
});
```

Or if you prefer to not use strings directly the package also exports some constants and objects:

```ts
import { BEER_CATEGORY, BeerSubCategories } from "systembolaget-api";

const products = await client.searchProducts({
  category: {
    category: BEER_CATEGORY,
    subCategory: BeerSubCategories.PorterAndStout,
  },
});
```

### Types

#### SearchProductsOptions

```ts
type SearchProductsOptions = {
  page?: number; // Which page in the search result to get. Default is 0.
  size?: number; // Number of products per page. Default is 30.
  category?: CategoryOptions; // Which product categories to search for.
  store?: string; // Which store to search for products in
};
```

### SearchResults

```ts
type SearchResults = {
  products: SearchProduct[];
  pagination: Pagination;
};
```

### SearchProduct

```ts
type SearchProduct = {
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
```

### Pagination

```ts
type Pagination = {
  currentPage: number;
  prevPage: number;
  nextPage: number;
  totalPages: number;
  pageSize: number;
};
```

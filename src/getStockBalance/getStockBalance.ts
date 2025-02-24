import { GET } from "../utils/GET";

const STOCK_BALANCE_URL = "/stockbalance/store";

type StockBalanceDTO = {
  productId: string;
  storeId: string;
  shelf: string;
  stock: number;
  isInStoreAssortment: true;
};

export type getStockBalanceOptions = {
  productId: string;
  storeId: string;
};

const getStockBalance = async (
  apiKey: string,
  { productId, storeId }: getStockBalanceOptions
) => {
  const response = await GET<StockBalanceDTO>(
    `${STOCK_BALANCE_URL}/${storeId}/${productId}`,
    apiKey
  );

  return {
    isInStoreAssortment: response.isInStoreAssortment,
    productId: response.productId,
    shelf: response.shelf,
    stock: response.stock,
    storeId: response.storeId,
  } satisfies StockBalanceDTO;
};

export default getStockBalance;

import { GET } from "../utils/GET";
import { mapToStore } from "./mapper";

const GET_STORES_URL = "/sitesearch/site";

type StoreSearchResultDTO = {
  siteSearchResults: StoreDTO[];
};

export type StoreDTO = {
  siteId: string;
  alias: string | null;
  streetAddress: string;
  displayName: string;
  county: string;
  city: string;
  postalCode: string | null;
  position: {
    latitude: number;
    longitude: number;
  };
};

const getStores = async (apiKey: string) => {
  const storesResult = await GET<StoreSearchResultDTO>(GET_STORES_URL, apiKey);

  return storesResult.siteSearchResults.map(mapToStore);
};

export default getStores;

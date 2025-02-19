import { Store } from "../types";
import { StoreDTO } from "./getStores";

export const mapToStore = (dto: StoreDTO) => {
  return {
    storeId: dto.siteId,
    storeName: dto.displayName,
    city: dto.city,
    streetAddress: dto.streetAddress,
    county: dto.county,
    position: dto.position,
  } satisfies Store;
};

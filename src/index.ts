import Client from "./client";
import { getApiKey } from "./credentials";

export const newClient = async () => {
  const apiKey = await getApiKey();

  return new Client(apiKey);
};

export * from "./constants";
export * from "./types";

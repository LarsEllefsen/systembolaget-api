import Client from "./client";
import { getApiKey } from "./credentials";

export const newClient = async (): Promise<SystembolagetAPIClient> => {
  const apiKey = await getApiKey();

  return new Client(apiKey);
};

export * from "./constants";
export * from "./types";
export type SystembolagetAPIClient = InstanceType<typeof Client>;

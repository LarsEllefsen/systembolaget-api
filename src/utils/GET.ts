import { ForbiddenError } from "../errors/ForbiddenError";

const BASE_URL = "https://api-extern.systembolaget.se/sb-api-ecommerce/v1";

export const GET = async <T>(
  path: string,
  apiKey: string,
  searchParams?: URLSearchParams
): Promise<T> => {
  const url = `${BASE_URL}${path}${searchParams ? "?" + searchParams : ""}`;
  const response = await fetch(url, {
    headers: {
      "ocp-apim-subscription-key": apiKey,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    if (response.status === 403) {
      throw new ForbiddenError(`Unable to GET ${url}: ${errorMessage}`);
    } else {
      throw new Error(`Unable to GET ${url}: ${errorMessage}`);
    }
  }

  const parsedResponse = await response.json();

  return parsedResponse as T;
};

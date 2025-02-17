import { ForbiddenError } from "../errors/ForbiddenError";

const BASE_URL = "https://api-extern.systembolaget.se/sb-api-ecommerce/v1";

export const GET = async <T>(
  path: string,
  apiKey: string,
  searchParams?: URLSearchParams
): Promise<T> => {
  const response = await fetch(
    `${BASE_URL}${path}${searchParams ? "?" + searchParams : ""}`,
    {
      headers: {
        "ocp-apim-subscription-key": apiKey,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    if (response.status === 403) {
      throw new ForbiddenError(`Unable to GET ${URL}: ${errorMessage}`);
    } else {
      throw new Error(`Unable to GET ${URL}: ${errorMessage}`);
    }
  }

  const parsedResponse = await response.json();

  return parsedResponse as T;
};

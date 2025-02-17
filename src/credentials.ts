const APP_BUNDLE_REGEX = new RegExp('<script src="([^"]+_app-[^"]+.js)"');
const API_KEY_REGEX = new RegExp('NEXT_PUBLIC_API_KEY_APIM:"([^"]+)"');

export const getApiKey = async () => {
  const documentResponse = await fetch("https://www.systembolaget.se");
  const document = await documentResponse.text();
  if (!documentResponse.ok) {
    throw new Error(`Unable to get api key: ${document}`);
  }

  const appBundleMatches = document.match(APP_BUNDLE_REGEX);

  if (appBundleMatches === null) {
    throw new Error(
      "Unable to get api key: Unable to find app bundle on systembolaget.se"
    );
  }

  const appBundleURL = appBundleMatches[1];
  const appBundleResponse = await fetch(
    `https://www.systembolaget.se${appBundleURL}`
  );
  const appBundle = await appBundleResponse.text();
  if (!appBundleResponse.ok) {
    if (!documentResponse.ok) {
      throw new Error(`Unable to get api key: ${appBundle}`);
    }
  }

  const apiKeyMatches = appBundle.match(API_KEY_REGEX);

  if (apiKeyMatches == null) {
    throw new Error(
      "Unable to get api key: Unable to find api key inside app bundle"
    );
  }

  return apiKeyMatches[1];
};

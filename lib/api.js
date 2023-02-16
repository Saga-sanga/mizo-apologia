// import ErrorBoundary from "../components/errorBoundary";
import qs from 'qs';

// Appends api home path to all request links
export function getStrapiURL(path = "") {
  return `${
    //  process.env.NEXT_PUBLIC_STRAPI_API_URL || 
    // "http://localhost:1330"
    "http://128.199.26.1:1330"
  }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  }

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error('An error occured please try again');
  }
  const data = await response.json();
  return data;
}

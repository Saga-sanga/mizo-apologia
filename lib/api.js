// import ErrorBoundary from "../components/errorBoundary";

// Appends api home path to all request links
export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  let data;
  const requestUrl = getStrapiURL(path);

  // Handle error if API doesn't respond with requested data
  try {
    const response = await fetch(requestUrl);
    data = await response.json();
  }
  catch(err) {
    console.log('Custom Error: '+err);
    data=[];
  }

  return data;
}

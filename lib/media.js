import { getStrapiURL } from "./api";

export function getStrapiMedia(media) {
  if (media) {
    const { url } = media.data.attributes;
    const mediaUrl = url.startsWith("/")
      ? getStrapiURL(url)
      : url;
  
    return mediaUrl;
  }

  return null;
}

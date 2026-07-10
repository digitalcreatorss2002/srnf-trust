const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const API_BASE_URL = isLocalhost
  ? "https://api.srnf.org"
  : "https://api.srnf.org";


export const ADMIN_BASE_URL = isLocalhost
  ? "https://admin.srnf.org"
  : "https://admin.srnf.org";

export const getImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  // Prepend admin base URL to relative uploads paths
  const cleanUrl = url.startsWith("/") ? url.substring(1) : url;
  return `${ADMIN_BASE_URL}/${cleanUrl}`;
};


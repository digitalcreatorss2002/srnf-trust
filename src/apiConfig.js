const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const API_BASE_URL = isLocalhost
  ? "http://localhost/srnf/srnf_data/api"
  : "https://hrntechsolutions.com/srnf_data/api";

export const ADMIN_BASE_URL = isLocalhost
  ? "http://localhost/srnf/srnf_data/admin"
  : "https://hrntechsolutions.com/srnf_data/admin";

export const getImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  // Prepend admin base URL to relative uploads paths
  const cleanUrl = url.startsWith("/") ? url.substring(1) : url;
  return `${ADMIN_BASE_URL}/${cleanUrl}`;
};


export const API_BASE_URL = "https://hrntechsolutions.com/srnf_data/api";
export const ADMIN_BASE_URL = "https://hrntechsolutions.com/srnf_data/admin";

export const getImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  // Prepend admin base URL to relative uploads paths
  const cleanUrl = url.startsWith("/") ? url.substring(1) : url;
  return `${ADMIN_BASE_URL}/${cleanUrl}`;
};

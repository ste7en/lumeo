
export const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error('API base URL is not defined');
}

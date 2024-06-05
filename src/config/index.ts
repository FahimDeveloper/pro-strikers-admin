const production: boolean = import.meta.env.PROD;

export const baseUrl = {
  BASE_URL: production
    ? import.meta.env.VITE_APP_LIVE_API_URL
    : import.meta.env.VITE_APP_TEST_API_URL,
  AUTH_REFRESH_URL: production
    ? import.meta.env.VITE_APP_LIVE_AUTH_REFRESH_URL
    : import.meta.env.VITE_APP_TEST_AUTH_REFRESH_URL,
};

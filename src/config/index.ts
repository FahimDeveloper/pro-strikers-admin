const node_env: string | undefined = process.env.NODE_ENV;

export const baseUrl = {
  BASE_URL:
    node_env === "production"
      ? import.meta.env.VITE_APP_LIVE_API_URL
      : import.meta.env.VITE_APP_TEST_API_URL,
  AUTH_REFRESH_URL:
    node_env === "production"
      ? import.meta.env.VITE_APP_LIVE_AUTH_REFRESH_URL
      : import.meta.env.VITE_APP_TEST_AUTH_REFRESH_URL,
};

// import { config as dotenvConfig } from "dotenv";
// dotenvConfig();

const node_env = import.meta.env.VITE_PUBLIC_NODE_ENV;

export const config = {
  backend_url:
    node_env === "development"
      ? import.meta.env.VITE_PUBLIC_LOCAL_API_KEY
      : import.meta.env.VITE_PUBLIC_BASE_API_KEY,
};

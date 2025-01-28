// import { config as dotenvConfig } from "dotenv";
// dotenvConfig();

const node_env = import.meta.env.VITE_PUBLIC_NODE_ENV;

export const config = {
  backend_url:
    node_env === "development"
      ? import.meta.env.VITE_PUBLIC_LOCAL_API_KEY
      : import.meta.env.VITE_PUBLIC_BASE_API_KEY,

  cloudinary_key: import.meta.env.VITE_CLOUD_KEY,
  cloudinary_name: import.meta.env.VITE_CLOUD_NAME,
  cloudinary_secret: import.meta.env.VITE_CLOUD_SECRET,
  cloudinary_api: import.meta.env.VITE_CLOUD_API,
  cloudinary_product_preset: import.meta.env.VITE_CLOUD_PRODUCT_PRESET,
  cloudinary_product_preset_pid: import.meta.env.VITE_CLOUD_PRODUCT_PRESET_PID,
};

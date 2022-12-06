declare global {
  namespace Express {
    interface Request {
      user?: Record<User | any>;
    }
  }
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  VITE_NODE_ENV: "development" | "production";
  VITE_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

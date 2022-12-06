declare global {
  namespace Express {
    interface Request {
      user?: Record<User>;
    }
  }
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  NODE_ENV: "development" | "production";
  PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly AIRPLANE_API_HOST?: string;
  readonly AIRPLANE_ENV_SLUG?: string;
  readonly AIRPLANE_TOKEN?: string;
  readonly AIRPLANE_API_KEY?: string;
  readonly AIRPLANE_USE_SELF_HOSTED_INPUTS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __VIEWS_LIB_VERSION__: string;

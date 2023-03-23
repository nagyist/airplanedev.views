declare namespace NodeJS {
  export interface ProcessEnv {
    AIRPLANE_TEAM_ID: string;
    AIRPLANE_USER_ID: string;
    AIRPLANE_USER_NAME: string;
    AIRPLANE_USER_EMAIL: string;
    AIRPLANE_ENV_SLUG: string;
    AIRPLANE_ENV_ID: string;
    AIRPLANE_ENV_ID_DEFAULT: "true" | "false";
    AIRPLANE_ENV_NAME: string;
    AIRPLANE_DEPLOYMENT_ID: string;
    AIRPLANE_VIEW_ID: string;
    AIRPLANE_VIEW_SLUG: string;
    AIRPLANE_VIEW_NAME: string;
    AIRPLANE_VIEW_URL: string;
  }
}

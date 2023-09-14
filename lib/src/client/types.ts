export type User = {
  userID: string;
  email: string;
  name: string;
  avatarURL?: string;
};
export type Group = { id: string; name: string };
export type UserGroup = { user?: User; group?: Group };
export interface EntitiesResponse {
  results: UserGroup[];
}

export interface ConstraintOption {
  label: string;
  value: ParamValue;
}

export interface TaskOption {
  slug: string;
  params?: ParamValues;
}

export type Parameter = {
  slug: string;
  name: string;
  type:
    | "boolean"
    | "upload"
    | "date"
    | "datetime"
    | "float"
    | "integer"
    | "string"
    | "json";
  component?: "textarea" | "editor-sql";
  default?: ParamValue;
  constraints: {
    optional: boolean;
    validate?: string;
    options?: Array<ConstraintOption | ParamValue> | TaskOption;
    regex?: string;
  };
  desc?: string;
  hidden?: string;
};

export interface TaskOrRunbookReviewersResponse {
  task?: {
    name: string;
    requireExplicitPermissions: boolean;
    triggers: { triggerID: string; kind: string }[];
    parameters: { parameters: Parameter[] };
  };
  runbook?: {
    name: string;
    isPrivate: boolean;
    triggers: { triggerID: string; kind: string }[];
    parameters: { parameters: Parameter[] };
  };
  reviewers: { userID?: string; groupID?: string }[];
}

export type View = {
  id: string;
  slug: string;
  archivedAt?: string;
  archivedBy?: string;
  name: string;
  description?: string;
  createdAt?: string;
  createdBy?: string;
  isLocal?: boolean;
};

export type TaskMetadata = {
  id: string;
  slug: string;
  isArchived?: boolean;
  isLocal?: boolean;
};

/**
 * isConstraintOptions is a user-defined type guard for checking if a variable is a list of constraint options.
 */
export const isConstraintOptions = (
  options: unknown,
): options is ConstraintOption[] => {
  if (!Array.isArray(options)) {
    return false;
  }
  return options.every(isConstraintOption);
};

/**
 * isConstraintOption is a user-defined type guard for checking if a variable is a constraint option.
 */
export const isConstraintOption = (o: unknown): o is ConstraintOption => {
  if (o == null || typeof o !== "object") {
    return false;
  }

  return "value" in o;
};

/**
 * isTaskOption is a user-defined type guard for checking if a variable is a TaskOption.
 */
export const isTaskOption = (options: unknown): options is TaskOption => {
  if (!options || Array.isArray(options)) {
    return false;
  }
  return typeof options === "object" && "slug" in options;
};

// JSONValue type
export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray;
export interface JSONObject {
  [key: string]: JSONValue;
}
export type JSONArray = Array<JSONValue>;

export type SingleParamValue =
  | string
  | boolean
  | number
  | Template
  | ConfigVar
  | ParamList
  | ParamMap
  | JSONValue
  | undefined
  | null;

export type MultiParamValue = ParamValue[];

export type ParamValue = SingleParamValue | MultiParamValue;
export type ParamValues = Record<string, ParamValue>;

export type ParamList = Array<unknown>;

export type ParamMap = Record<string, unknown>;

/**
 * ConfigVar is a basic representation of a config variable, used for parameters.
 */
export type ConfigVar = {
  __airplaneType: "configvar";
  name: string;
};

export type Template = {
  __airplaneType: "template";
  raw: string;
};

export const isTemplate = (v: unknown): v is Template =>
  v != null &&
  typeof v === "object" &&
  (v as Template)["__airplaneType"] === "template";

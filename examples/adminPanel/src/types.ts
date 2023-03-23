export type ListTeamsParams = Record<string, never>;

export type ListTeamsOutputs = {
  id: number;
  company_name: string;
  country: string;
  signup_date: string;
  is_suspended?: boolean;
};

export type ListUsersParams = {
  account_id: number;
};

export type ListUsersOutputs = {
  id: number;
  role: string;
  name: string;
  email: boolean;
  is_suspended?: boolean;
};

export type UpdateTeamParams = {
  id: string;
  company_name: string;
};

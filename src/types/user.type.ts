export type IUser = {
  _id: string;
  first_name: string;
  last_name: string;
  image: string;
  gender: "male" | "female";
  email: string;
  password: string;
  role: "user";
  phone: string;
  date_of_birth: Date;
  membership: boolean;
  active: boolean;
  issue_date?: Date;
  expiry_date?: Date;
  package_name: string;
  plan: string;
};

export type IUserParams = {
  search: string | undefined;
  page: number | undefined;
  limit: number | undefined;
  membership: boolean | undefined;
};

export type IUserMembershipParams = {
  search: string | undefined;
  page: number | undefined;
  limit: number | undefined;
  package_name: string | undefined;
  activity: boolean | undefined;
};

export interface IAdmin {
  _id: string;
  first_name: string;
  last_name: string;
  image: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: "male" | "female";
  role: "super-admin" | "admin" | "trainer";
  description: string;
  password: string;
}

export type IAdminParams = {
  search: string | undefined;
  page: number | undefined;
  limit: number | undefined;
  role: string | undefined;
};

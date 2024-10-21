import { IUser } from "./user.type";

export interface IPayment {
  _id: string;
  transaction_id: string;
  amount: number;
  user: IUser;
  email: string;
  service: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPaymentParams {
  search: string | undefined;
  page: number | undefined;
  limit: number | undefined;
  service: string | undefined;
}

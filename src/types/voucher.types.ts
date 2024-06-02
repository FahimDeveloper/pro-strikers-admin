export type IVoucher = {
  _id: string;
  voucher_type: string;
  discount_type: string;
  discount_value: number;
  start_date: string;
  end_date: string;
  used: number;
  voucher_code: string;
  description: string;
};

export type IVoucherParams = {
  search: string | undefined;
  page: number | undefined;
  limit: number | undefined;
  voucher_type: string | undefined;
};

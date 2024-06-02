/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomingQueryType } from "../../../types/index.types";
import { IVoucher, IVoucherParams } from "../../../types/voucher.types";
import { voucherApiSlice } from "../../api/httpsSlice";

const voucherApi = voucherApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    vouchers: builder.query<IncomingQueryType<IVoucher>, IVoucherParams>({
      query: (params) => ({
        url: "/vouchers",
        method: "GET",
        params,
      }),
      providesTags: ["vouchers"],
    }),
    voucher: builder.query<any, any>({
      query: (id) => ({
        url: `/vouchers/${id}`,
        method: "GET",
      }),
      providesTags: ["voucher"],
    }),
    createVoucher: builder.mutation<any, any>({
      query: (body) => ({
        url: "/vouchers/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["vouchers"],
    }),
    updateVoucher: builder.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/vouchers/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["vouchers", "voucher"],
    }),
    deleteVoucher: builder.mutation<any, any>({
      query: (id) => ({
        url: `/vouchers/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vouchers"],
    }),
  }),
});

export const {
  useVouchersQuery,
  useVoucherQuery,
  useCreateVoucherMutation,
  useUpdateVoucherMutation,
  useDeleteVoucherMutation,
} = voucherApi;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomingQueryType } from "../../../types/index.types";
import { IPayment, IPaymentParams } from "../../../types/payment";
import { paymentApiSlice } from "../../api/httpsSlice";

const paymentApi = paymentApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    payments: builder.query<IncomingQueryType<IPayment>, IPaymentParams>({
      query: (params) => ({
        url: "/payments",
        method: "GET",
        params,
      }),
      providesTags: ["payments"],
    }),
    createPayment: builder.mutation<any, IPayment>({
      query: (payload) => ({
        url: "/payments/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["payments"],
    }),
    updatePayment: builder.mutation<
      any,
      { id: string; payload: Partial<IPayment> }
    >({
      query: ({ id, payload }) => ({
        url: `/payments/update/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["payments"],
    }),
    deletePayment: builder.mutation({
      query: (id) => ({
        url: `/payments/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["payments"],
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  usePaymentsQuery,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentApi;

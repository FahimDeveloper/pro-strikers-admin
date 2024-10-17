/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomingQueryType } from "../../../types/index.types";
import { orderApiSlice } from "../../api/httpsSlice";

const orderApi = orderApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    orders: builder.query<IncomingQueryType<any>, any>({
      query: (params) => ({
        url: "/orders",
        method: "GET",
        params,
      }),
      providesTags: ["orders"],
    }),
    order: builder.query<any, any>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    createOrder: builder.mutation<any, any>({
      query: (body) => ({
        url: "/orders/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["orders"],
    }),
    updateOrder: builder.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/orders/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["orders", "order"],
    }),
    deleteOrder: builder.mutation<any, any>({
      query: (id) => ({
        url: `/orders/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
    cancelOrder: builder.mutation<any, any>({
      query: (id) => ({
        url: `/orders/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["orders", "order"],
    }),
  }),
});

export const {
  useOrdersQuery,
  useOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;

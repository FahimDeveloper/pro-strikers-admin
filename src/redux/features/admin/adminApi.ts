/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAdmin, IAdminParams } from "../../../types/admin.types";
import { IncomingQueryType } from "../../../types/index.types";
import { adminApiSlice } from "../../api/httpsSlice";

const adminApi = adminApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    admins: builder.query<IncomingQueryType<IAdmin>, IAdminParams>({
      query: (params) => ({
        url: "/admins",
        method: "GET",
        params,
      }),
      providesTags: ["admins"],
    }),
    admin: builder.query<any, any>({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    trainers: builder.query({
      query: () => ({
        url: `/admins/trainers`,
        method: "GET",
      }),
      providesTags: ["trainers"],
    }),
    createAdmin: builder.mutation<any, any>({
      query: (body) => ({
        url: "/admins/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["admins", "trainers"],
    }),
    updateAdmin: builder.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/admins/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["admins", "admin"],
    }),
    deleteAdmin: builder.mutation<any, any>({
      query: (id) => ({
        url: `/admins/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admins"],
    }),
  }),
});

export const {
  useAdminsQuery,
  useAdminQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
  useTrainersQuery,
} = adminApi;

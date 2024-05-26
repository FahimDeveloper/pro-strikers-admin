/* eslint-disable @typescript-eslint/no-explicit-any */
import { adminApiSlice } from "../../api/httpsSlice";

const adminApi = adminApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminList: builder.query<any, any>({
      query: () => ({
        url: "/admins",
        method: "GET",
      }),
      providesTags: ["adminList"],
    }),
    singleAdmin: builder.query<any, any>({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "GET",
      }),
    }),
    createAdmin: builder.mutation<any, any>({
      query: (body) => ({
        url: "/admins/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["adminList"],
    }),
    updateAdmin: builder.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/admins/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["adminList"],
    }),
    deleteAdmin: builder.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/admins/delete/${id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["adminList"],
    }),
  }),
});

export const {
  useAdminListQuery,
  useSingleAdminQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminApi;

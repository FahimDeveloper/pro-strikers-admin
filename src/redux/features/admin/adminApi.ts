/* eslint-disable @typescript-eslint/no-explicit-any */
import { adminApiSlice } from "../../api/httpsSlice";

const adminApi = adminApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    admins: builder.query<any, any>({
      query: () => ({
        url: "/admins",
        method: "GET",
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
    createAdmin: builder.mutation<any, any>({
      query: (body) => ({
        url: "/admins/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["admins"],
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
} = adminApi;

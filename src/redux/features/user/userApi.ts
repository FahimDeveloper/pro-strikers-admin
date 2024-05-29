/* eslint-disable @typescript-eslint/no-explicit-any */
import { userApiSlice } from "../../api/httpsSlice";

const userApi = userApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query<any, any>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    user: builder.query<any, any>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    createUser: builder.mutation<any, any>({
      query: (body) => ({
        url: "/users/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["users"],
    }),
    updateUser: builder.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/users/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["users", "user"],
    }),
    deleteUser: builder.mutation<any, any>({
      query: (id) => ({
        url: `/users/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useUsersQuery,
  useUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;

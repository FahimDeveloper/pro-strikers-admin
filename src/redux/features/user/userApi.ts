/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomingQueryType } from "../../../types/index.types";
import {
  IUser,
  IUserMembershipParams,
  IUserParams,
} from "../../../types/user.type";
import { userApiSlice } from "../../api/httpsSlice";

const userApi = userApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query<IncomingQueryType<IUser>, IUserParams>({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
      providesTags: ["users"],
    }),
    membershipUsers: builder.query<
      IncomingQueryType<IUser>,
      IUserMembershipParams
    >({
      query: (params) => ({
        url: "/users/membership",
        method: "GET",
        params,
      }),
      providesTags: ["membership-users"],
    }),
    usersEmail: builder.query({
      query: () => ({
        url: "/users/email",
        method: "GET",
      }),
      providesTags: ["users-email"],
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
  useMembershipUsersQuery,
  useUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUsersEmailQuery,
} = userApi;

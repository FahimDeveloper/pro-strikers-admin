import { authApiSlice } from "../../api/httpsSlice";

const authApi = authApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/admin/login",
        method: "POST",
        body: credentials,
      }),
    }),
    fogotPassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/admin/forgot-password",
        method: "POST",
        body: credentials,
      }),
    }),
    linkVerify: builder.query({
      query: ({ token }) => ({
        url: `/auth/forgot-password/link-verify/${token}`,
        method: "GET",
      }),
    }),
    sendVerifyCode: builder.mutation({
      query: (credentials) => ({
        url: "/auth/forgot-password/send-code",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyCode: builder.mutation({
      query: (body) => ({
        url: `/auth/forgot-password/code-verify`,
        method: "POST",
        body: body,
      }),
    }),
    ResetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/admin/reset-password",
        method: "POST",
        body: credentials,
      }),
    }),
    changePassword: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/auth/admin/${id}/change-password`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useFogotPasswordMutation,
  useLinkVerifyQuery,
  useResetPasswordMutation,
  useSendVerifyCodeMutation,
  useVerifyCodeMutation,
  useChangePasswordMutation,
} = authApi;

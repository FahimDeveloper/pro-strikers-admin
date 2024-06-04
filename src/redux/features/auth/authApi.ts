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
    ResetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/admin/reset-password",
        method: "POST",
        body: credentials,
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
} = authApi;

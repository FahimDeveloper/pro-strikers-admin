/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { loggedInUser, loggedOutUser } from "../features/auth/authSlice";
import { baseUrl } from "../../config";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl.BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const res = await fetch(`${baseUrl.AUTH_REFRESH_URL}`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        loggedInUser({
          user,
          token: data.data.accessToken,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(loggedOutUser());
    }
  }
  return result;
};

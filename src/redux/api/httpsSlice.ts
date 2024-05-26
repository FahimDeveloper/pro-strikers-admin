import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRefreshToken } from "./baseQuery";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});

export const adminApiSlice = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["admins", "admin"],
  endpoints: () => ({}),
});

export const appointmentScheduleApiSlice = createApi({
  reducerPath: "appointmentScheduleApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["appointment", "appointments"],
  endpoints: () => ({}),
});

export const classScheduleApiSlice = createApi({
  reducerPath: "classScheduleApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["class", "classes"],
  endpoints: () => ({}),
});

export const courseScheduleApiSlice = createApi({
  reducerPath: "courseScheduleApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["course", "courses"],
  endpoints: () => ({}),
});

export const facilityScheduleApiSlice = createApi({
  reducerPath: "facilityScheduleApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["facility", "facilities"],
  endpoints: () => ({}),
});

export const eventApiSlice = createApi({
  reducerPath: "eventApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["events", "event"],
  endpoints: () => ({}),
});

export const postApiSlice = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["posts", "post"],
  endpoints: () => ({}),
});

export const voucherApiSlice = createApi({
  reducerPath: "voucherApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["vouchers", "voucher"],
  endpoints: () => ({}),
});

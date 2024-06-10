import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRefreshToken } from "./baseQuery";
import { baseUrl } from "../../config";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl.BASE_URL,
  }),
  endpoints: () => ({}),
});

export const adminApiSlice = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["admins", "admin", "trianers"],
  endpoints: () => ({}),
});

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["users", "user", "membership-users", "users-email"],
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
  tagTypes: ["class", "classes", "class-by-date"],
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

export const storeApiSlice = createApi({
  reducerPath: "storeApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["products", "product"],
  endpoints: () => ({}),
});

export const laneApiSlice = createApi({
  reducerPath: "laneApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["lanes", "lane"],
  endpoints: () => ({}),
});

export const orderApiSlice = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["orders", "order"],
  endpoints: () => ({}),
});

export const appointmentGroupReservationApiSlice = createApi({
  reducerPath: "appointmentGroupReservationApiSlice",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["reservations", "reservation"],
  endpoints: () => ({}),
});

export const appointmentOneOnOneReservationApiSlice = createApi({
  reducerPath: "appointmentOneOnOneReservationApiSlice",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["reservations", "reservation"],
  endpoints: () => ({}),
});

export const classReservationApiSlice = createApi({
  reducerPath: "classReservationApiSlice",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["reservations", "reservation"],
  endpoints: () => ({}),
});
export const courseReservationApiSlice = createApi({
  reducerPath: "courseReservationApiSlice",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["reservations", "reservation"],
  endpoints: () => ({}),
});
export const facilityReservationApiSlice = createApi({
  reducerPath: "facilityReservationApiSlice",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["reservations", "reservation"],
  endpoints: () => ({}),
});

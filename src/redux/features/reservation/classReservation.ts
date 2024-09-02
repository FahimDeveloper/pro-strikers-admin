/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomingQueryType } from "../../../types/index.types";
import { classReservationApiSlice } from "../../api/httpsSlice";

const classReservationApi = classReservationApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    classReservations: builder.query<IncomingQueryType<any>, any>({
      query: (params) => ({
        url: "/reservations/classes",
        method: "GET",
        params,
      }),
      providesTags: ["reservations"],
    }),
    classReservation: builder.query<any, any>({
      query: (id) => ({
        url: `/reservations/classes/${id}`,
        method: "GET",
      }),
      providesTags: ["reservation"],
    }),
    checkClass: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/schedule/classes/by-id-date`,
        method: "POST",
        body: payload,
      }),
    }),
    createClassReservation: builder.mutation<any, any>({
      query: (body) => ({
        url: "/reservations/classes/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["reservations"],
    }),
    updateClassReservation: builder.mutation<any, any>({
      query: ({ id, payload }) => ({
        url: `/reservations/classes/update/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["reservations", "reservation"],
    }),
    deleteClassReservation: builder.mutation<any, any>({
      query: (id) => ({
        url: `/reservations/classes/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reservations"],
    }),
  }),
});

export const {
  useClassReservationsQuery,
  useClassReservationQuery,
  useCreateClassReservationMutation,
  useUpdateClassReservationMutation,
  useDeleteClassReservationMutation,
  useCheckClassMutation,
} = classReservationApi;

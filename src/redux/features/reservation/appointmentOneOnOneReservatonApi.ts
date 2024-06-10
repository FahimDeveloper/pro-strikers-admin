/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomingQueryType } from "../../../types/index.types";
import { appointmentOneOnOneReservationApiSlice } from "../../api/httpsSlice";

const appointmentOneOnOneReservationApi =
  appointmentOneOnOneReservationApiSlice.injectEndpoints({
    endpoints: (builder) => ({
      appointmentOneOnOneReservations: builder.query<
        IncomingQueryType<any>,
        any
      >({
        query: (params) => ({
          url: "/reservations/appointments/one-on-one",
          method: "GET",
          params,
        }),
        providesTags: ["reservations"],
      }),
      appointmentOneOnOneReservation: builder.query<any, any>({
        query: (id) => ({
          url: `/reservations/appointments/one-on-one/${id}`,
          method: "GET",
        }),
        providesTags: ["reservation"],
      }),
      createAppointmentOneOnOneReservation: builder.mutation<any, any>({
        query: (body) => ({
          url: "/reservations/appointments/one-on-one/create",
          method: "POST",
          body,
        }),
        invalidatesTags: ["reservations"],
      }),
      updateAppointmentOneOnOneReservation: builder.mutation<any, any>({
        query: ({ id, body }) => ({
          url: `/reservations/appointments/one-on-one/update/${id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["reservations", "reservation"],
      }),
      deleteAppointmentOneOnOneReservation: builder.mutation<any, any>({
        query: (id) => ({
          url: `/reservations/appointments/one-on-one/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["reservations"],
      }),
    }),
  });

export const {
  useAppointmentOneOnOneReservationsQuery,
  useAppointmentOneOnOneReservationQuery,
  useCreateAppointmentOneOnOneReservationMutation,
  useUpdateAppointmentOneOnOneReservationMutation,
  useDeleteAppointmentOneOnOneReservationMutation,
} = appointmentOneOnOneReservationApi;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomingQueryType } from "../../../types/index.types";
import { appointmentGroupReservationApiSlice } from "../../api/httpsSlice";

const appointmentGroupReservationApi =
  appointmentGroupReservationApiSlice.injectEndpoints({
    endpoints: (builder) => ({
      appointmentGroupReservations: builder.query<IncomingQueryType<any>, any>({
        query: (params) => ({
          url: "/reservations/appointments/group",
          method: "GET",
          params,
        }),
        providesTags: ["reservations"],
      }),
      checkGroupAppointment: builder.mutation<any, any>({
        query: (payload) => ({
          url: `/schedule/appointments/group/by-id-date`,
          method: "POST",
          body: payload,
        }),
      }),
      appointmentGroupReservation: builder.query<any, any>({
        query: (id) => ({
          url: `/reservations/appointments/group/${id}`,
          method: "GET",
        }),
        providesTags: ["reservation"],
      }),
      createAppointmentGroupReservation: builder.mutation<any, any>({
        query: (payload) => ({
          url: "/reservations/appointments/group/admin/create",
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["reservations"],
      }),
      updateAppointmentGroupReservation: builder.mutation<any, any>({
        query: ({ id, body }) => ({
          url: `/reservations/appointments/group/admin/update/${id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["reservations", "reservation"],
      }),
      deleteAppointmentGroupReservation: builder.mutation<any, any>({
        query: (id) => ({
          url: `/reservations/appointments/group/admin/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["reservations"],
      }),
    }),
  });

export const {
  useAppointmentGroupReservationsQuery,
  useAppointmentGroupReservationQuery,
  useCreateAppointmentGroupReservationMutation,
  useUpdateAppointmentGroupReservationMutation,
  useDeleteAppointmentGroupReservationMutation,
  useCheckGroupAppointmentMutation,
} = appointmentGroupReservationApi;

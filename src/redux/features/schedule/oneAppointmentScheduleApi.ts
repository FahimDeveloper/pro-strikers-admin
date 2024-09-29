/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IAppointmentSchedule,
  IAppointmentScheduleParams,
} from "../../../types/appointment.types";
import { IncomingQueryType } from "../../../types/index.types";
import { oneAppointmentScheduleApiSlice } from "../../api/httpsSlice";

const oneAppointmentScheduleApi =
  oneAppointmentScheduleApiSlice.injectEndpoints({
    endpoints: (builder) => ({
      oneAppointments: builder.query<
        IncomingQueryType<IAppointmentSchedule>,
        IAppointmentScheduleParams
      >({
        query: (params) => ({
          url: "/schedule/appointments/one-on-one",
          method: "GET",
          params,
        }),
        providesTags: ["appointments"],
      }),
      oneAppointment: builder.query<any, string>({
        query: (id) => ({
          url: `/schedule/appointments/one-on-one/${id}`,
          method: "GET",
        }),
        providesTags: ["appointment"],
      }),
      getOneAppointment: builder.mutation<any, any>({
        query: (id) => ({
          url: `/schedule/appointments/one-on-one/appointment`,
          method: "POST",
          body: { id },
        }),
      }),
      createOneAppointment: builder.mutation<any, IAppointmentSchedule>({
        query: (body) => ({
          url: "/schedule/appointments/one-on-one/create",
          method: "POST",
          body,
        }),
        invalidatesTags: ["appointments"],
      }),
      updateOneAppointment: builder.mutation<
        any,
        { id: string; body: Partial<IAppointmentSchedule> }
      >({
        query: ({ id, body }) => ({
          url: `/schedule/appointments/one-on-one/update/${id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["appointment", "appointments"],
      }),
      deleteOneAppointment: builder.mutation<any, string>({
        query: (id) => ({
          url: `/schedule/appointments/one-on-one/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["appointments"],
      }),
    }),
  });

export const {
  useCreateOneAppointmentMutation,
  useDeleteOneAppointmentMutation,
  useGetOneAppointmentMutation,
  useOneAppointmentQuery,
  useOneAppointmentsQuery,
  useUpdateOneAppointmentMutation,
} = oneAppointmentScheduleApi;

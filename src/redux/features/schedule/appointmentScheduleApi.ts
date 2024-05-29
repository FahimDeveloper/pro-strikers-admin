/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IAppointmentSchedule,
  IAppointmentScheduleParams,
} from "../../../types/appointmentSchedule.types";
import { IncomingQueryType } from "../../../types/index.types";
import { appointmentScheduleApiSlice } from "../../api/httpsSlice";

const appointmentScheduleApi = appointmentScheduleApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    appointments: builder.query<
      IncomingQueryType<IAppointmentSchedule>,
      IAppointmentScheduleParams
    >({
      query: (params) => ({
        url: "/schedule/appointments",
        method: "GET",
        params,
      }),
      providesTags: ["appointments"],
    }),
    appointment: builder.query<any, string>({
      query: (id) => ({
        url: `/schedule/appointments/${id}`,
        method: "GET",
      }),
      providesTags: ["appointment"],
    }),
    createAppointment: builder.mutation<any, IAppointmentSchedule>({
      query: (body) => ({
        url: "/schedule/appointments/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["appointments"],
    }),
    updateAppointment: builder.mutation<
      any,
      { id: string; body: Partial<IAppointmentSchedule> }
    >({
      query: ({ id, body }) => ({
        url: `/schedule/appointments/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["appointment", "appointments"],
    }),
    deleteAppointment: builder.mutation<any, string>({
      query: (id) => ({
        url: `/schedule/appointments/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["appointments"],
    }),
  }),
});

export const {
  useAppointmentsQuery,
  useAppointmentQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentScheduleApi;

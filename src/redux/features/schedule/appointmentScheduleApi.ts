/* eslint-disable @typescript-eslint/no-explicit-any */
import { appointmentScheduleApiSlice } from "../../api/httpsSlice";

const appointmentScheduleApi = appointmentScheduleApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    appointments: builder.query<any, any>({
      query: () => ({
        url: "/appointments",
        method: "GET",
      }),
      providesTags: ["appointments"],
    }),
    appointment: builder.query<any, any>({
      query: (id) => ({
        url: `/appointments/${id}`,
        method: "GET",
      }),
      providesTags: ["appointment"],
    }),
    createAppointment: builder.mutation<any, any>({
      query: (body) => ({
        url: "/appointments/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["appointments"],
    }),
    updateAppointment: builder.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/appointments/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["appointment", "appointments"],
    }),
    deleteAppointment: builder.mutation<any, any>({
      query: (id) => ({
        url: `/appointments/delete/${id}`,
        method: "POST",
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

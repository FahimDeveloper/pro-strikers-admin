/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IAppointmentSchedule,
  IAppointmentScheduleParams,
} from "../../../types/appointmentSchedule.types";
import { IncomingQueryType } from "../../../types/index.types";
import { groupAppointmentScheduleApiSlice } from "../../api/httpsSlice";

const groupAppointmentScheduleApi =
  groupAppointmentScheduleApiSlice.injectEndpoints({
    endpoints: (builder) => ({
      groupAppointments: builder.query<
        IncomingQueryType<IAppointmentSchedule>,
        IAppointmentScheduleParams
      >({
        query: (params) => ({
          url: "/schedule/appointments/group",
          method: "GET",
          params,
        }),
        providesTags: ["appointments"],
      }),
      groupAppointment: builder.query<any, string>({
        query: (id) => ({
          url: `/schedule/appointments/group/${id}`,
          method: "GET",
        }),
        providesTags: ["appointment"],
      }),
      createGroupAppointment: builder.mutation<any, IAppointmentSchedule>({
        query: (body) => ({
          url: "/schedule/appointments/group/create",
          method: "POST",
          body,
        }),
        invalidatesTags: ["appointments"],
      }),
      updateGroupAppointment: builder.mutation<
        any,
        { id: string; body: Partial<IAppointmentSchedule> }
      >({
        query: ({ id, body }) => ({
          url: `/schedule/appointments/group/update/${id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["appointment", "appointments"],
      }),
      deleteGroupAppointment: builder.mutation<any, string>({
        query: (id) => ({
          url: `/schedule/appointments/group/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["appointments"],
      }),
    }),
  });

export const {
  useCreateGroupAppointmentMutation,
  useDeleteGroupAppointmentMutation,
  useGroupAppointmentQuery,
  useGroupAppointmentsQuery,
  useUpdateGroupAppointmentMutation,
} = groupAppointmentScheduleApi;

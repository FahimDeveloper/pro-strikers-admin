/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEventGroupReservation,
  IEventParams,
} from "../../../types/event.types";
import { IncomingQueryType } from "../../../types/index.types";
import { eventGroupReservationApiSlice } from "../../api/httpsSlice";

const eventGroupReservationApi = eventGroupReservationApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEventGroupReservation: builder.mutation<any, IEventGroupReservation>({
      query: (payload) => ({
        url: "/reservations/events/group/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["group-reservations"],
    }),
    updateEventGroupReservation: builder.mutation<
      any,
      { id: string; payload: IEventGroupReservation }
    >({
      query: ({ id, payload }) => ({
        url: `/reservations/events/group/update/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["group-reservations", "group-reservation"],
    }),
    eventGroupReservations: builder.query<
      IncomingQueryType<IEventGroupReservation>,
      IEventParams
    >({
      query: (params) => ({
        url: `/reservations/events/group`,
        method: "GET",
        params,
      }),
      providesTags: ["group-reservations"],
    }),
    eventGroupReservation: builder.query<IEventGroupReservation, string>({
      query: (id) => ({
        url: `/reservations/events/group/${id}`,
        method: "GET",
      }),
      providesTags: ["group-reservation"],
    }),
    deleteEventGroupReservation: builder.mutation<any, string>({
      query: (id) => ({
        url: `/reservations/events/group/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["group-reservations"],
    }),
  }),
});

export const {
  useCreateEventGroupReservationMutation,
  useUpdateEventGroupReservationMutation,
  useDeleteEventGroupReservationMutation,
  useEventGroupReservationsQuery,
  useEventGroupReservationQuery,
} = eventGroupReservationApi;

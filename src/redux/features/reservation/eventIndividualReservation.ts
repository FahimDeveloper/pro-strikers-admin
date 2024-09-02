/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEventIndividualReservation,
  IEventParams,
} from "../../../types/event.types";
import { IncomingQueryType } from "../../../types/index.types";
import { eventIndividualReservationApiSlice } from "../../api/httpsSlice";

const eventIndividualReservationApi =
  eventIndividualReservationApiSlice.injectEndpoints({
    endpoints: (builder) => ({
      createEventIndividualReservation: builder.mutation<
        any,
        IEventIndividualReservation
      >({
        query: (payload) => ({
          url: "/reservations/events/individual/create",
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["individual-reservations"],
      }),
      updateEventIndividualReservation: builder.mutation<
        any,
        { id: string; payload: IEventIndividualReservation }
      >({
        query: ({ id, payload }) => ({
          url: `/reservations/events/individual/update/${id}`,
          method: "PATCH",
          body: payload,
        }),
        invalidatesTags: ["individual-reservations", "individual-reservation"],
      }),
      eventIndividualReservations: builder.query<
        IncomingQueryType<IEventIndividualReservation>,
        IEventParams
      >({
        query: (params) => ({
          url: `/reservations/events/individual`,
          method: "GET",
          params,
        }),
        providesTags: ["individual-reservations"],
      }),
      eventIndividualReservation: builder.query<
        IEventIndividualReservation,
        string
      >({
        query: (id) => ({
          url: `/reservations/events/individual/${id}`,
          method: "GET",
        }),
        providesTags: ["individual-reservation"],
      }),
      deleteEventIndividualReservation: builder.mutation<any, string>({
        query: (id) => ({
          url: `/reservations/events/individual/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["individual-reservations"],
      }),
    }),
  });

export const {
  useCreateEventIndividualReservationMutation,
  useUpdateEventIndividualReservationMutation,
  useDeleteEventIndividualReservationMutation,
  useEventIndividualReservationsQuery,
  useEventIndividualReservationQuery,
} = eventIndividualReservationApi;

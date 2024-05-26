/* eslint-disable @typescript-eslint/no-explicit-any */
import { eventApiSlice } from "../../api/httpsSlice";

const eventApi = eventApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    events: builder.query<any, any>({
      query: () => ({
        url: "/events",
        method: "GET",
      }),
      providesTags: ["events"],
    }),
    event: builder.query<any, any>({
      query: (id) => ({
        url: `/events/${id}`,
        method: "GET",
      }),
      providesTags: ["event"],
    }),
    createEvent: builder.mutation<any, any>({
      query: (body) => ({
        url: "/events/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["events"],
    }),
    updateEvent: builder.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/events/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["events", "event"],
    }),
    deleteEvent: builder.mutation<any, any>({
      query: (id) => ({
        url: `/events/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["events"],
    }),
  }),
});

export const {
  useEventsQuery,
  useEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;

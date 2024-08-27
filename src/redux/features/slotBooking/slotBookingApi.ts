/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomingQueryType } from "../../../types/index.types";
import { slotBookingApiSlice } from "../../api/httpsSlice";

const slotBookingApi = slotBookingApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCartSlot: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/reservations/slot-bookings/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["carts", "booked"],
    }),
    getBookingSlots: builder.query<any, any>({
      query: (params) => ({
        url: "/reservations/slot-bookings",
        method: "GET",
        params,
      }),
      providesTags: ["carts"],
    }),
    deleteBookingSlot: builder.mutation({
      query: (id) => ({
        url: `/reservations/slot-bookings/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["carts"],
    }),
    groupTrainingBookedSlots: builder.query<
      IncomingQueryType<{
        date: string;
        training: string;
        time_slot: string;
      }>,
      { date: string; training: string }
    >({
      query: (params) => ({
        url: "/reservations/appointments/group/slots",
        method: "GET",
        params,
      }),
      providesTags: ["booked"],
    }),
  }),
});

export const {
  useAddToCartSlotMutation,
  useDeleteBookingSlotMutation,
  useGetBookingSlotsQuery,
  useGroupTrainingBookedSlotsQuery,
} = slotBookingApi;

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
      invalidatesTags: [
        "carts",
        "group-training-booking",
        "facility-booking",
        "one-training-booking",
      ],
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
      providesTags: ["group-training-booking"],
    }),
    oneTrainingBookedSlots: builder.query<
      IncomingQueryType<{
        date: string;
        training: string;
        time_slot: string;
      }>,
      { date: string; training: string }
    >({
      query: (params) => ({
        url: "/reservations/appointments/one-on-one/slots",
        method: "GET",
        params,
      }),
      providesTags: ["one-training-booking"],
    }),
    facilityBookedSlots: builder.query<
      IncomingQueryType<{
        date: string;
        training: string;
        time_slot: string;
      }>,
      { date: string; training: string }
    >({
      query: (params) => ({
        url: "/reservations/facilities/slots",
        method: "GET",
        params,
      }),
      providesTags: ["facility-booking"],
    }),
  }),
});

export const {
  useAddToCartSlotMutation,
  useDeleteBookingSlotMutation,
  useGetBookingSlotsQuery,
  useGroupTrainingBookedSlotsQuery,
  useFacilityBookedSlotsQuery,
  useOneTrainingBookedSlotsQuery,
} = slotBookingApi;

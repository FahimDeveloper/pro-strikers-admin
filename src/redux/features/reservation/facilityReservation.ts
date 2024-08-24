/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomingQueryType } from "../../../types/index.types";
import { facilityReservationApiSlice } from "../../api/httpsSlice";

const facilityReservationApi = facilityReservationApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    facilityReservations: builder.query<IncomingQueryType<any>, any>({
      query: (params) => ({
        url: "/reservations/facilities",
        method: "GET",
        params,
      }),
      providesTags: ["reservations"],
    }),
    facilityReservation: builder.query<any, any>({
      query: (id) => ({
        url: `/reservations/facilities/${id}`,
        method: "GET",
      }),
      providesTags: ["reservation"],
    }),
    createFacilityReservation: builder.mutation<any, any>({
      query: (body) => ({
        url: "/reservations/facilities/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["reservations"],
    }),
    updateFacilityReservation: builder.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/reservations/facilities/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["reservations", "reservation"],
    }),
    deleteFacilityReservation: builder.mutation<any, any>({
      query: (id) => ({
        url: `/reservations/facilities/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reservations"],
    }),
    addToCartFacility: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/reservations/carts/facilities/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["carts"],
    }),
    getFacilityReservationCart: builder.query<any, any>({
      query: (params) => ({
        url: "/reservations/carts/facilities",
        method: "GET",
        params,
      }),
      providesTags: ["carts"],
    }),
    deleteUserCartsFacility: builder.mutation({
      query: (id) => ({
        url: `/reservations/carts/facilities/delete/all/${id}`,
        method: "DELETE",
      }),
    }),
    deleteCartFacility: builder.mutation({
      query: (id) => ({
        url: `/reservations/carts/facilities/delete/single/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["carts"],
    }),
  }),
});

export const {
  useFacilityReservationsQuery,
  useFacilityReservationQuery,
  useCreateFacilityReservationMutation,
  useUpdateFacilityReservationMutation,
  useDeleteFacilityReservationMutation,
  useAddToCartFacilityMutation,
  useGetFacilityReservationCartQuery,
  useDeleteUserCartsFacilityMutation,
  useDeleteCartFacilityMutation,
} = facilityReservationApi;

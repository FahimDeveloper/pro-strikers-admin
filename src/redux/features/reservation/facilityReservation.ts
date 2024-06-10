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
  }),
});

export const {
  useFacilityReservationsQuery,
  useFacilityReservationQuery,
  useCreateFacilityReservationMutation,
  useUpdateFacilityReservationMutation,
  useDeleteFacilityReservationMutation,
} = facilityReservationApi;

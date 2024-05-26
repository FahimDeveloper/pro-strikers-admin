/* eslint-disable @typescript-eslint/no-explicit-any */

import { facilityScheduleApiSlice } from "../../api/httpsSlice";

const facilityScheduleApi = facilityScheduleApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    facilities: builder.query<any, any>({
      query: () => ({
        url: "/facilities",
        method: "GET",
      }),
      providesTags: ["facilities"],
    }),
    facility: builder.query<any, any>({
      query: (id) => ({
        url: `/facilities/${id}`,
        method: "GET",
      }),
      providesTags: ["facility"],
    }),
    createFacility: builder.mutation<any, any>({
      query: (body) => ({
        url: "/facilities/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["facilities"],
    }),
    updateFacility: builder.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/facilities/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["facility", "facilities"],
    }),
    deleteFacility: builder.mutation<any, any>({
      query: (id) => ({
        url: `/facilities/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["facilities"],
    }),
  }),
});

export const {
  useFacilitiesQuery,
  useFacilityQuery,
  useCreateFacilityMutation,
  useUpdateFacilityMutation,
  useDeleteFacilityMutation,
} = facilityScheduleApi;

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  IFacilitySchedule,
  IFacilityScheduleParams,
} from "../../../types/facility.types";
import { IncomingQueryType } from "../../../types/index.types";
import { facilityScheduleApiSlice } from "../../api/httpsSlice";

const facilityScheduleApi = facilityScheduleApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    facilities: builder.query<
      IncomingQueryType<IFacilitySchedule>,
      IFacilityScheduleParams
    >({
      query: (params) => ({
        url: "/schedule/facilities",
        method: "GET",
        params,
      }),
      providesTags: ["facilities"],
    }),
    facility: builder.query<any, string>({
      query: (id) => ({
        url: `/schedule/facilities/${id}`,
        method: "GET",
      }),
      providesTags: ["facility"],
    }),
    getfacility: builder.mutation<any, string>({
      query: (id) => {
        return {
          url: `/schedule/facilities/facility`,
          method: "POST",
          body: { id: id },
        };
      },
    }),
    createFacility: builder.mutation<any, IFacilitySchedule>({
      query: (body) => ({
        url: "/schedule/facilities/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["facilities"],
    }),
    updateFacility: builder.mutation<
      any,
      { id: string; body: Partial<IFacilitySchedule> }
    >({
      query: ({ id, body }) => ({
        url: `/schedule/facilities/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["facility", "facilities"],
    }),
    deleteFacility: builder.mutation<any, string>({
      query: (id) => ({
        url: `/schedule/facilities/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["facilities"],
    }),
  }),
});

export const {
  useFacilitiesQuery,
  useFacilityQuery,
  useLazyFacilityQuery,
  useCreateFacilityMutation,
  useUpdateFacilityMutation,
  useDeleteFacilityMutation,
  useGetfacilityMutation,
} = facilityScheduleApi;

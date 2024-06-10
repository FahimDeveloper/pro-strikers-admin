/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomingQueryType } from "../../../types/index.types";
import { laneApiSlice } from "../../api/httpsSlice";

const laneApi = laneApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    lanes: builder.query<IncomingQueryType<any>, any>({
      query: (params) => ({
        url: "/lanes",
        method: "GET",
        params,
      }),
      providesTags: ["lanes"],
    }),
    lane: builder.query<any, any>({
      query: (id) => ({
        url: `/lanes/${id}`,
        method: "GET",
      }),
      providesTags: ["lane"],
    }),
    laneTitle: builder.query({
      query: () => ({
        url: `/lanes/lane-title`,
        method: "GET",
      }),
      providesTags: ["lane-title"],
    }),
    createLane: builder.mutation<any, any>({
      query: (body) => ({
        url: "/lanes/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["lanes", "lane-title"],
    }),
    updateLane: builder.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/lanes/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["lanes", "lane"],
    }),
    deleteLane: builder.mutation<any, any>({
      query: (id) => ({
        url: `/lanes/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lanes"],
    }),
  }),
});

export const {
  useLanesQuery,
  useLaneQuery,
  useCreateLaneMutation,
  useUpdateLaneMutation,
  useDeleteLaneMutation,
  useLaneTitleQuery,
} = laneApi;

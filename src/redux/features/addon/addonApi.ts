/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomingQueryType } from "../../../types/index.types";
import { addonApiSlice } from "../../api/httpsSlice";

const addonApi = addonApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addons: builder.query<IncomingQueryType<any>, any>({
      query: (params) => ({
        url: "/addons",
        method: "GET",
        params,
      }),
      providesTags: ["addons"],
    }),
    getSportAddons: builder.query<any, { sport: string }>({
      query: (params) => ({
        url: `/addons/sport-addon`,
        method: "GET",
        params,
      }),
    }),
    addon: builder.query<any, any>({
      query: (id) => ({
        url: `/addons/${id}`,
        method: "GET",
      }),
      providesTags: ["addon"],
    }),
    createAddon: builder.mutation<any, any>({
      query: (body) => ({
        url: "/addons/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["addons"],
    }),
    updateAddon: builder.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/addons/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["addons", "addon"],
    }),
    deleteAddon: builder.mutation<any, any>({
      query: (id) => ({
        url: `/addons/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["addons"],
    }),
  }),
});

export const {
  useAddonQuery,
  useAddonsQuery,
  useCreateAddonMutation,
  useDeleteAddonMutation,
  useUpdateAddonMutation,
  useGetSportAddonsQuery,
} = addonApi;

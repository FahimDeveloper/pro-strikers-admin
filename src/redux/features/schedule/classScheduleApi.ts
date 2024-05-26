/* eslint-disable @typescript-eslint/no-explicit-any */
import { classScheduleApiSlice } from "../../api/httpsSlice";

const classScheduleApi = classScheduleApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    classes: builder.query<any, any>({
      query: () => ({
        url: "/classes",
        method: "GET",
      }),
      providesTags: ["classes"],
    }),
    class: builder.query<any, any>({
      query: (id) => ({
        url: `/classes/${id}`,
        method: "GET",
      }),
      providesTags: ["class"],
    }),
    createClass: builder.mutation<any, any>({
      query: (body) => ({
        url: "/classes/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["classes"],
    }),
    updateClass: builder.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/classes/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["class", "classes"],
    }),
    deleteClass: builder.mutation<any, any>({
      query: (id) => ({
        url: `/classes/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["classes"],
    }),
  }),
});

export const {
  useClassesQuery,
  useClassQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = classScheduleApi;

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IClassSchedule,
  IClassScheduleParams,
} from "../../../types/class.types";
import { IncomingQueryType } from "../../../types/index.types";
import { classScheduleApiSlice } from "../../api/httpsSlice";

const classScheduleApi = classScheduleApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    classes: builder.query<
      IncomingQueryType<IClassSchedule>,
      IClassScheduleParams
    >({
      query: (params) => ({
        url: "/schedule/classes",
        method: "GET",
        params,
      }),
      providesTags: ["classes"],
    }),
    class: builder.query<any, string>({
      query: (id) => ({
        url: `/schedule/classes/${id}`,
        method: "GET",
      }),
      providesTags: ["class"],
    }),
    classByDate: builder.mutation<any, any>({
      query: (body) => ({
        url: `/schedule/classes/by-date`,
        method: "POST",
        body: body,
      }),
    }),
    createClass: builder.mutation<any, IClassSchedule>({
      query: (body) => ({
        url: "/schedule/classes/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["classes"],
    }),
    updateClass: builder.mutation<
      any,
      { id: string; body: Partial<IClassSchedule> }
    >({
      query: ({ id, body }) => ({
        url: `/schedule/classes/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["class", "classes"],
    }),
    deleteClass: builder.mutation<any, string>({
      query: (id) => ({
        url: `/schedule/classes/delete/${id}`,
        method: "DELETE",
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
  useClassByDateMutation,
} = classScheduleApi;

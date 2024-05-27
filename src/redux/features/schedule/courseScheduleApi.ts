/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ICourseSchedule,
  ICourseScheduleParams,
} from "../../../types/couseSchedule.types";
import { IncomingQueryType } from "../../../types/index.types";
import { courseScheduleApiSlice } from "../../api/httpsSlice";

const courseScheduleApi = courseScheduleApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    courses: builder.query<
      IncomingQueryType<ICourseSchedule>,
      ICourseScheduleParams
    >({
      query: (params) => ({
        url: "/schedule/courses",
        method: "GET",
        params,
      }),
      providesTags: ["courses"],
    }),
    course: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/schedule/courses/${id}`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    createCourse: builder.mutation<any, ICourseSchedule>({
      query: (body) => ({
        url: "/schedule/courses/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["courses"],
    }),
    updateCourse: builder.mutation<
      any,
      { id: string; body: Partial<ICourseSchedule> }
    >({
      query: ({ id, body }) => ({
        url: `/schedule/courses/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["course", "courses"],
    }),
    deleteCourse: builder.mutation<any, { id: string }>({
      query: (id) => ({
        url: `/schedule/courses/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["courses"],
    }),
  }),
});

export const {
  useCoursesQuery,
  useCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseScheduleApi;

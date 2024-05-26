/* eslint-disable @typescript-eslint/no-explicit-any */
import { courseScheduleApiSlice } from "../../api/httpsSlice";

const courseScheduleApi = courseScheduleApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    courses: builder.query<any, any>({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
      providesTags: ["courses"],
    }),
    course: builder.query<any, any>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    createCourse: builder.mutation<any, any>({
      query: (body) => ({
        url: "/courses/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["courses"],
    }),
    updateCourse: builder.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/courses/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["course", "courses"],
    }),
    deleteCourse: builder.mutation<any, any>({
      query: (id) => ({
        url: `/courses/delete/${id}`,
        method: "POST",
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

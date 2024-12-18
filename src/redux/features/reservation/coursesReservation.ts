/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICourseParams, ICourseReservation } from "../../../types/couse.types";
import { IncomingQueryType } from "../../../types/index.types";
import { courseReservationApiSlice } from "../../api/httpsSlice";

const courseReservationApi = courseReservationApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    courseReservations: builder.query<
      IncomingQueryType<ICourseReservation>,
      ICourseParams
    >({
      query: (params) => ({
        url: "/reservations/courses",
        method: "GET",
        params,
      }),
      providesTags: ["reservations"],
    }),
    courseReservation: builder.query<any, any>({
      query: (id) => ({
        url: `/reservations/courses/${id}`,
        method: "GET",
      }),
      providesTags: ["reservation"],
    }),
    createCourseReservation: builder.mutation<any, any>({
      query: (body) => ({
        url: "/reservations/courses/admin/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["reservations"],
    }),
    updateCourseReservation: builder.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/reservations/courses/admin/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["reservations", "reservation"],
    }),
    deleteCourseReservation: builder.mutation<any, any>({
      query: (id) => ({
        url: `/reservations/courses/admin/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reservations"],
    }),
  }),
});

export const {
  useCourseReservationsQuery,
  useCourseReservationQuery,
  useCreateCourseReservationMutation,
  useUpdateCourseReservationMutation,
  useDeleteCourseReservationMutation,
} = courseReservationApi;

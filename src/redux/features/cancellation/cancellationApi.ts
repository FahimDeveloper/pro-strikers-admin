import { cancellationApiSlice } from "../../api/httpsSlice";

const cancellationApi = cancellationApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMembershipCancellation: builder.query({
      query: (params) => ({
        url: `/cancellation/memberships`,
        method: "GET",
        params,
      }),
      providesTags: ["memberships"],
    }),
    updateMembershipCancellation: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/cancellation/memberships/update/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["memberships"],
    }),
    deleteMembershipCancellation: builder.mutation({
      query: (id) => ({
        url: `/cancellation/memberships/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["memberships"],
    }),
  }),
});

export const {
  useGetMembershipCancellationQuery,
  useUpdateMembershipCancellationMutation,
  useDeleteMembershipCancellationMutation,
} = cancellationApi;

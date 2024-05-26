/* eslint-disable @typescript-eslint/no-explicit-any */
import { postApiSlice } from "../../api/httpsSlice";

const postApi = postApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    posts: builder.query<any, any>({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
      providesTags: ["posts"],
    }),
    post: builder.query<any, any>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    createPost: builder.mutation<any, any>({
      query: (body) => ({
        url: "/posts/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["posts"],
    }),
    updatePost: builder.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/posts/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["posts", "post"],
    }),
    deletePost: builder.mutation<any, any>({
      query: (id) => ({
        url: `/posts/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),
  }),
});

export const {
  usePostsQuery,
  usePostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;

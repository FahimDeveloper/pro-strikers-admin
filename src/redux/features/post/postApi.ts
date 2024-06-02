/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomingQueryType } from "../../../types/index.types";
import { IPost, IPostParams } from "../../../types/post.type";
import { postApiSlice } from "../../api/httpsSlice";

const postApi = postApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    posts: builder.query<IncomingQueryType<IPost>, IPostParams>({
      query: (params) => ({
        url: "/posts",
        method: "GET",
        params,
      }),
      providesTags: ["posts"],
    }),
    post: builder.query<any, string>({
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
    deletePost: builder.mutation<any, string>({
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

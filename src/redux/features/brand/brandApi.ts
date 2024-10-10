import { IBrand, IBrandParams } from "../../../types/brand.types";
import { IncomingQueryType } from "../../../types/index.types";
import { brandApiSlice } from "../../api/httpsSlice";

const brandApi = brandApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    brands: builder.query<IncomingQueryType<IBrand>, IBrandParams>({
      query: (params) => ({
        url: "/brands",
        method: "GET",
        params,
      }),
      providesTags: ["brands"],
    }),
    brand: builder.query<IBrand, { id: string }>({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "GET",
      }),
      providesTags: ["brand"],
    }),
    createBrand: builder.mutation({
      query: (body) => ({
        url: `/brands/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["brands", "brand"],
    }),
    updateBrand: builder.mutation({
      query: ({ id, body }) => ({
        url: `/brands/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["brands", "brand"],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brands/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brands", "brand"],
    }),
  }),
});

export const {
  useBrandsQuery,
  useBrandQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomingQueryType } from "../../../types/index.types";
import { storeApiSlice } from "../../api/httpsSlice";

const storeApi = storeApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query<IncomingQueryType<any>, any>({
      query: (params) => ({
        url: "/stores/products",
        method: "GET",
        params,
      }),
      providesTags: ["products"],
    }),
    product: builder.query<any, any>({
      query: (id) => ({
        url: `/stores/products/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    createProduct: builder.mutation<any, any>({
      query: (body) => ({
        url: "/stores/products/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation<any, any>({
      query: ({ id, body }) => ({
        url: `/stores/products/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["products", "product"],
    }),
    deleteProduct: builder.mutation<any, any>({
      query: (id) => ({
        url: `/stores/products/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useProductsQuery,
  useProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = storeApi;

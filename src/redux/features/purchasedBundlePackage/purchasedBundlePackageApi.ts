/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IBundleCreditPackRequest,
  IBundleCreditPackResponse,
  IPurchasedBundleCreditPackParams,
} from "../../../types/bundle-package.type";
import { IncomingQueryType } from "../../../types/index.types";
import { purchasedBundlePackageApiSlice } from "../../api/httpsSlice";

export const purchasedBundlePackageApi =
  purchasedBundlePackageApiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getPurchasedBundlePackages: builder.query<
        IncomingQueryType<IBundleCreditPackResponse>,
        IPurchasedBundleCreditPackParams
      >({
        query: (params) => ({
          url: "/bundle-credit-package",
          method: "GET",
          params,
        }),
        providesTags: ["packages"],
      }),
      updatePurchasedBundlePack: builder.mutation<
        any,
        { id: string; body: IBundleCreditPackRequest }
      >({
        query: ({ id, body }) => ({
          url: `/bundle-credit-package/update/${id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["packages"],
      }),
    }),
  });

export const {
  useGetPurchasedBundlePackagesQuery,
  useUpdatePurchasedBundlePackMutation,
} = purchasedBundlePackageApi;

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { useGetPurchases } from "../hooks/useGetPurchases";
import useUpdatePurchases from "../hooks/useUpdatePurchases";
import useSetNewPurchase from "../hooks/useSetNewPurchase";

export const purchasesApi = createApi({
  reducerPath: "purchasesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["purchases"],
  endpoints: (builder) => ({
    getPurchasesData: builder.query({
      queryFn: useGetPurchases,
      providesTags: ["purchases"],
    }),
    setNewPurchasesData: builder.mutation({
      queryFn: useSetNewPurchase,
      invalidatesTags: ["purchases"],
    }),
    updatePurchasesData: builder.mutation({
      queryFn: useUpdatePurchases,
      invalidatesTags: ["purchases"],
    }),
  }),
});

export const {
  useGetPurchasesDataQuery,
  useUpdatePurchasesDataMutation,
  useSetNewPurchasesDataMutation,
} = purchasesApi;

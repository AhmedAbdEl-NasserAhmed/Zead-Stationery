import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { useGetPurchases } from "../hooks/useGetPurchases";
import useUpdatePurchases from "../hooks/useUpdatePurchases";

export const purchasesApi = createApi({
  reducerPath: "purchasesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["purchases"],
  endpoints: (builder) => ({
    getPurchasesData: builder.query({
      queryFn: useGetPurchases,
      providesTags: ["purchases"],
    }),
    updatePurchasesData: builder.mutation({
      queryFn: useUpdatePurchases,
      invalidatesTags: ["purchases"],
    }),
  }),
});

export const { useGetPurchasesDataQuery, useUpdatePurchasesDataMutation } =
  purchasesApi;

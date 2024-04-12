import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { useGetCapitalHistory } from "../hooks/useGetCapitalHistory";
import useUpdateCapitalHistory from "../hooks/useUpdateCapitalHistory";

export const capitalHistoryApi = createApi({
  reducerPath: "capitalHistoryApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["capitalHistory"],
  endpoints: (builder) => ({
    getCapitalHistoryData: builder.query({
      queryFn: useGetCapitalHistory,
      providesTags: ["capitalHistory"],
    }),
    updateCapitalHistoryData: builder.mutation({
      queryFn: useUpdateCapitalHistory,
      invalidatesTags: ["capitalHistory"],
    }),
  }),
});

export const {
  useGetCapitalHistoryDataQuery,
  useUpdateCapitalHistoryDataMutation,
} = capitalHistoryApi;

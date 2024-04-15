import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { useGetBills } from "../hooks/useGetBills";

export const billsApi = createApi({
  reducerPath: "billApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["bills"],
  endpoints: (builder) => ({
    getBillslData: builder.query({
      queryFn: useGetBills,
      providesTags: ["bills"],
    }),
  }),
});

export const { useGetBillslDataQuery } = billsApi;

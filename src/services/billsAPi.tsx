import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { useGetBills } from "../hooks/useGetBills";
import useSetNewBill from "../hooks/useSetNewBill";

export const billsApi = createApi({
  reducerPath: "billApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["bills"],
  endpoints: (builder) => ({
    getBillslData: builder.query({
      queryFn: useGetBills,
      providesTags: ["bills"],
    }),
    setNewBill: builder.query({
      queryFn: useSetNewBill,
      providesTags: ["bills"],
    }),
  }),
});

export const { useGetBillslDataQuery, useSetNewBillQuery } = billsApi;

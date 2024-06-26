import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { useGetBills } from "../hooks/useGetBills";
import useSetNewBill from "../hooks/useSetNewBill";
import useUpdateBillInvoice from "../hooks/useUpdateBill";

export const billsApi = createApi({
  reducerPath: "billApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["bills"],
  endpoints: (builder) => ({
    getBillslData: builder.query({
      queryFn: useGetBills,
      providesTags: ["bills"],
    }),
    setNewBill: builder.mutation({
      queryFn: useSetNewBill,
      invalidatesTags: ["bills"],
    }),
    updateBillInvoice: builder.mutation({
      queryFn: useUpdateBillInvoice,
      invalidatesTags: ["bills"],
    }),
  }),
});

export const {
  useGetBillslDataQuery,
  useSetNewBillMutation,
  useUpdateBillInvoiceMutation,
} = billsApi;

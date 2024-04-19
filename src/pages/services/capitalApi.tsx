import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { useGetCapital } from "../../hooks/useGetCapital";
import useUpdateCapital from "../../hooks/useUpdateCapital";

export const capitalApi = createApi({
  reducerPath: "capitalApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["capital"],
  endpoints: (builder) => ({
    getCapitalData: builder.query({
      queryFn: useGetCapital,
      providesTags: ["capital"],
    }),
    updateCapitalData: builder.mutation({
      queryFn: useUpdateCapital,
      invalidatesTags: ["capital"],
    }),
  }),
});

export const { useGetCapitalDataQuery, useUpdateCapitalDataMutation } =
  capitalApi;

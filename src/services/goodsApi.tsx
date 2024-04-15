import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { useGetGoods } from "../hooks/useGetGoods";
import useUpdateGoods from "../hooks/useUpdateGoods";
import useDeleteProduct from "../hooks/useDeleteProduct";
import useUpdateExistedProduct from "../hooks/useUpdateExistedProduct";

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["goods"],
  endpoints: (builder) => ({
    getGoodsData: builder.query({
      queryFn: useGetGoods,
      providesTags: ["goods"],
    }),
    updateGoodsData: builder.mutation({
      queryFn: useUpdateGoods,
      invalidatesTags: ["goods"],
    }),
    useUpdateExistedProduct: builder.mutation({
      queryFn: useUpdateExistedProduct,
      invalidatesTags: ["goods"],
    }),
    deleteProduct: builder.mutation({
      queryFn: useDeleteProduct,
      invalidatesTags: ["goods"],
    }),
  }),
});

export const {
  useGetGoodsDataQuery,
  useUpdateGoodsDataMutation,
  useUseUpdateExistedProductMutation,
  useDeleteProductMutation,
} = goodsApi;

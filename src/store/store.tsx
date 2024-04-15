import sliderSlice from "./slices/sliderSlice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { goodsApi } from "../services/goodsApi";
import { purchasesApi } from "../services/purchasesApi";
import { capitalApi } from "../services/capitalApi";
import currentCapitalSlice from "./slices/currentCapitalSlice";
import { capitalHistoryApi } from "../services/capitalHistory";
import { billsApi } from "../services/billsAPi";

export const store = configureStore({
  reducer: {
    slider: sliderSlice,
    currentCapital: currentCapitalSlice,
    [goodsApi.reducerPath]: goodsApi.reducer,
    [purchasesApi.reducerPath]: purchasesApi.reducer,
    [capitalApi.reducerPath]: capitalApi.reducer,
    [capitalHistoryApi.reducerPath]: capitalHistoryApi.reducer,
    [billsApi.reducerPath]: billsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      goodsApi.middleware,
      purchasesApi.middleware,
      capitalApi.middleware,
      capitalHistoryApi.middleware,
      billsApi.middleware
    ),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

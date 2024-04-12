import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
};

const currentCapitalSlice = createSlice({
  name: "selectedProductSlice",
  initialState,
  reducers: {
    assingAmount(state, action) {
      state.amount = action.payload;
    },
    decrementAmount(state, action) {
      console.log("state", state.amount);
      state.amount = state.amount - action.payload;
    },
    incrementAmount(state, action) {
      state.amount += action.payload;
    },
  },
});

export const { assingAmount, decrementAmount, incrementAmount } =
  currentCapitalSlice.actions;

export default currentCapitalSlice.reducer;

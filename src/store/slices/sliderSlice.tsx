import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PositionObject } from "../../interfaces/positionObject";

const initialState: PositionObject = {
  right: 0,
  left: 0,
  width: 28.5,
};

const sliderSlice = createSlice({
  name: "sliderSlice",
  initialState,
  reducers: {
    move: {
      prepare(right, left, width) {
        return {
          payload: { right, left, width },
        };
      },

      reducer(state: PositionObject, action: PayloadAction<PositionObject>) {
        state.right = action.payload.right;
        state.left = action.payload.left;
        state.width = action.payload.width;
      },
    },
  },
});

export const { move } = sliderSlice.actions;

export default sliderSlice.reducer;

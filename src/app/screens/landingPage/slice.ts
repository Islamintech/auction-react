import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuctionCar, LandingPageState } from "../../../lib/types/landing";

const initialState: LandingPageState = {
  cars: [],
  savedIds: [],
};

const landingPageSlice = createSlice({
  name: "landingPage",
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<AuctionCar[]>) => {
      state.cars = action.payload;
    },
    toggleSaved: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.savedIds = state.savedIds.includes(id)
        ? state.savedIds.filter((x) => x !== id)
        : [...state.savedIds, id];
    },
  },
});

export const { setCars, toggleSaved } = landingPageSlice.actions;
export default landingPageSlice.reducer;

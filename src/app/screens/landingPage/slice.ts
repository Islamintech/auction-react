import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuctionCar, LandingPageState } from "../../../lib/types/landing";
import { MOCK_CARS } from "../../../lib/data/cars";

const initialState: LandingPageState = {
  cars: MOCK_CARS,
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

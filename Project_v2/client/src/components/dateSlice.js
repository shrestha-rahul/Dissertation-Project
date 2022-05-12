import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  datescome: [],
  datesbehind: [],
  currentdate: "",
  day: "",
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDatesbehind: (state, action) => {
      state.datesbehind = action.payload;
    },
    setDatescome: (state, action) => {
      state.datescome = action.payload;
    },
    setCurrentdate: (state, action) => {
      state.currentdate = action.payload;
    },
    setDay: (state, action) => {
      state.day = action.payload;
    },
  },
});

export const { setDatesbehind, setDatescome, setCurrentdate, setDay } =
  dateSlice.actions;

export const selectDatescome = (state) => state.date.datescome;
export const selectDatesbehind = (state) => state.date.datesbehind;
export const selectCurrentdate = (state) => state.date.currentdate;
export const selectDay = (state) => state.date.day;

export default dateSlice.reducer;

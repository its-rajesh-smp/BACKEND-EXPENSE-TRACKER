import { createSlice } from "@reduxjs/toolkit";

const reportHistorySlice = createSlice({
  name: "reports",
  initialState: [],
  reducers: {
    addReport: (state, action) => {
      return [action.payload, ...state];
    },
    setReports: (state, action) => {
      return action.payload;
    },
    clearReports: (state) => {
      return [];
    },
  },
});

export default reportHistorySlice;
export const { addReport, setReports, clearReports } =
  reportHistorySlice.actions;

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Reducer/authSlice";
import expenseSlice from "../Reducer/expenseSlice";
import reportHistorySlice from "../Reducer/reportHistorySlice";
const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    expenseSlice: expenseSlice.reducer,
    reportHistorySlice: reportHistorySlice.reducer,
  },
});
export default store;

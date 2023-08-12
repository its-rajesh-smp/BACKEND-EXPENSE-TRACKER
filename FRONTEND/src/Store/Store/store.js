import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Reducer/authSlice";
import expenseSlice from "../Reducer/expenseSlice";
const store = configureStore({
  reducer: { authSlice: authSlice.reducer, expenseSlice: expenseSlice.reducer },
});
export default store;

import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "user details auth",
  initialState: {
    expenses: [],
    totalCount: 0,
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses = [action.payload, ...state.expenses];
      state.totalCount = state.totalCount + 1;
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload.expenses;
      state.totalCount = action.payload.totalCount;
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
      state.totalCount = state.totalCount - 1;
    },
  },
});

export default expenseSlice;
export const { addExpense, setExpenses, deleteExpense } = expenseSlice.actions;

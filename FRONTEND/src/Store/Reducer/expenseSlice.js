import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "user details auth",
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses = [action.payload, ...state.expenses];
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
    },
  },
});

export default expenseSlice;
export const { addExpense, setExpenses, deleteExpense } = expenseSlice.actions;

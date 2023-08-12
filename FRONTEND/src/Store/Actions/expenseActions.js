import axios from "axios";
import { EXPENSE_CREATE, EXPENSE_DELETE } from "../../Api/endpoints";
import { addExpense, deleteExpense } from "../Reducer/expenseSlice";
import { updateUser } from "../Reducer/authSlice";

export const createExpenseAct = (name, price, category) => {
  return async (dispatch, getState) => {
    try {
      const { email, totalExpense } = getState().authSlice;

      const payload = {
        name,
        price,
        category,
        userEmail: email,
        updatedTotalExpense: totalExpense + price,
      };

      const { data } = await axios.post(EXPENSE_CREATE, payload);

      dispatch(addExpense(data));
      dispatch(updateUser({ totalExpense: totalExpense + price }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteExpenseAct = (id, price) => {
  return async (dispatch, getState) => {
    try {
      const { email, totalExpense } = getState().authSlice;

      const payload = {
        userEmail: email,
        id,
        updatedTotalExpense: totalExpense - price,
      };

      await axios.post(`${EXPENSE_DELETE}`, payload);

      dispatch(deleteExpense({ id: id }));
      dispatch(updateUser({ totalExpense: totalExpense - price }));
    } catch (error) {
      console.log(error);
    }
  };
};

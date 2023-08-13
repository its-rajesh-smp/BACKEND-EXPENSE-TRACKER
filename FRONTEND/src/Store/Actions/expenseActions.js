import axios from "axios";
import {
  EXPENSE_CREATE,
  EXPENSE_DELETE,
  EXPENSE_DOWNLOAD,
} from "../../Api/endpoints";
import { addExpense, deleteExpense } from "../Reducer/expenseSlice";
import { updateUser } from "../Reducer/authSlice";
import { addReport } from "../Reducer/reportHistorySlice";

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

export const downloadExpenseAct = (setLoader) => {
  return async (dispatch, getState) => {
    try {
      const localIdToken = localStorage.getItem("expensetracker_idToken");
      if (!localIdToken) {
        setLoader(false);
        return;
      }

      const { data } = await axios.get(EXPENSE_DOWNLOAD, {
        headers: { Authorization: localIdToken },
      });

      const a = document.createElement("a");
      a.href = data.url;
      a.download = `${data.userEmail}-${new Date().getTime()}`;
      a.click();

      dispatch(addReport(data));
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
    setLoader(false);
  };
};

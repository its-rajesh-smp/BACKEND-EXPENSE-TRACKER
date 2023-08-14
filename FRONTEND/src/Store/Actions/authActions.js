import axios from "axios";
import { USER_GET, USER_SIGNIN, USER_SIGNUP } from "../../Api/endpoints";
import { authUser, logoutUser } from "../Reducer/authSlice";
import { setExpenses } from "../Reducer/expenseSlice";

export const createNewUserAct = (name, email, password) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(USER_SIGNUP, { name, email, password });
      console.log(data);

      localStorage.setItem("expensetracker_idToken", data.idToken);

      dispatch(authUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginUserAct = (email, password) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(USER_SIGNIN, { email, password });

      localStorage.setItem("expensetracker_idToken", data.idToken);

      dispatch(authUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserAct = () => {
  return async (dispatch, getState) => {
    try {
      const localIdToken = localStorage.getItem("expensetracker_idToken");
      if (!localIdToken) {
        return;
      }

      const { data } = await axios.post(USER_GET, { idToken: localIdToken });

      dispatch(authUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const logoutUserAct = () => {
  return async (dispatch) => {
    localStorage.removeItem("expensetracker_idToken");
    dispatch(logoutUser());
    dispatch(setExpenses([]));
  };
};

import axios from "axios";
import { setReports } from "../Reducer/reportHistorySlice";
import { DOWNLOADURL_GETALL } from "../../Api/endpoints";

export const getAllReports = () => {
  return async (dispatch) => {
    try {
      const localIdToken = localStorage.getItem("expensetracker_idToken");
      if (!localIdToken) {
        return;
      }

      const { data } = await axios.get(DOWNLOADURL_GETALL, {
        headers: { Authorization: localIdToken },
      });

      dispatch(setReports(data));
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
};

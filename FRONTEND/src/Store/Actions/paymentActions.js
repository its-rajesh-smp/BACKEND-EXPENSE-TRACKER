import axios from "axios";
import {
  PAYMENT_CREATE_ORDER,
  PAYMENT_FAILED,
  PAYMENT_SUCCESS,
} from "../../Api/endpoints";
import { updateUser } from "../Reducer/authSlice";
export const buyPremiumAct = () => {
  return async (dispatch) => {
    try {
      const localIdToken = localStorage.getItem("expensetracker_idToken");
      if (!localIdToken) {
        return;
      }

      // Requesting For Order_id
      const { data } = await axios.post(PAYMENT_CREATE_ORDER, {
        idToken: localIdToken,
      });

      // Razorpay Options
      const options = {
        order_id: data.orderId,
        key: "rzp_test_dBNYxUpjT9AZUS",
        handler: async function (response) {
          try {
            const payload = {
              userEmail: data.userEmail,
              paymentId: response.razorpay_payment_id,
              orderId: data.orderId,
            };
            const { data: paymentData } = await axios.post(
              PAYMENT_SUCCESS,
              payload
            );

            dispatch(updateUser(paymentData));
          } catch (error) {
            console.log(error);
            alert(
              `PAYMENT SUCCESS BUT FOUND ERROR -- CONTACT US WITH THIS ID ${response.razorpay_payment_id} `
            );
          }
        },
      };

      // Razorpay Instance
      var rzp1 = new Razorpay(options);

      // If Payment Failed
      rzp1.on("payment.failed", async function (response) {
        try {
          await axios.post(PAYMENT_FAILED, { orderId: data.orderId });
          alert("PAYMENT FAILED");
        } catch (error) {
          console.log(error);
          alert(error.message);
        }
      });

      // Opening Razorpay
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };
};

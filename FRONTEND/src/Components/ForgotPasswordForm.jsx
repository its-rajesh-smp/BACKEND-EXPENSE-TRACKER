import React, { useState } from "react";
import axios from "axios";
import { PASSWORD_FORGOT_PASSWORD } from "../Api/endpoints";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  async function sendForgotPasswordHandeler() {
    try {
      await axios.post(PASSWORD_FORGOT_PASSWORD, { email });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=" p-4 h-80 w-[50%] rounded-md flex flex-col bg-green-100 justify-center items-center gap-5">
      <p className=" text-3xl">Forgot Password</p>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="p-2 px-5"
        type="email"
        placeholder="Email"
      />
      <button
        onClick={sendForgotPasswordHandeler}
        className=" bg-gray-300 p-2 rounded-md"
      >
        Send Verification Email
      </button>
    </div>
  );
}

export default ForgotPasswordForm;

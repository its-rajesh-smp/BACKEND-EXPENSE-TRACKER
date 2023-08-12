import React, { useState } from "react";
import LoginForm from "../Components/LoginForm";
import ForgotPasswordForm from "../Components/ForgotPasswordForm";

function LoginPage() {
  const [loginForm, setLoginForm] = useState(true);

  return (
    <div className=" gap-10 flex p-5 justify-center items-center flex-col">
      <h1 className=" text-4xl">LOGIN / CREATE ACCOUNT</h1>
      {loginForm ? <LoginForm /> : <ForgotPasswordForm />}
      <p className=" cursor-pointer" onClick={() => setLoginForm((p) => !p)}>
        {loginForm ? "Forgot Password" : "Login With Password"}
      </p>
    </div>
  );
}

export default LoginPage;

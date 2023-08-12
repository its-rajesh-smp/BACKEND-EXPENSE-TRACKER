import React from "react";
import LoginForm from "../Components/LoginForm";

function LoginPage() {
  return (
    <div className=" gap-10 flex p-5 justify-center items-center flex-col">
      <h1 className=" text-4xl">LOGIN / CREATE ACCOUNT</h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;

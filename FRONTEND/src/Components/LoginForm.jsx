import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewUserAct, loginUserAct } from "../Store/Actions/authActions";

function LoginForm() {
  const [loginForm, setLoginForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onClickHaveAccount = (e) => {
    e.preventDefault();
    setLoginForm((p) => !p);
  };

  const onSubmitHandeler = (e) => {
    e.preventDefault();
    loginForm
      ? dispatch(loginUserAct(email, password))
      : dispatch(createNewUserAct(name, email, password));
  };

  return (
    <form className=" p-4 h-80 w-[50%] rounded-md flex flex-col bg-green-100 justify-center items-center gap-2">
      <h1 className=" text-3xl">
        {loginForm ? "LOGIN" : "CREATE NEW ACCOUNT"}
      </h1>
      <div className=" flex w-[50%] gap-5 flex-col">
        {!loginForm && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" px-2"
            type="text"
            placeholder="Enter Name"
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" px-2"
          type="text"
          placeholder="Enter Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" px-2"
          type="text"
          placeholder="Enter Password"
        />
        <button
          onClick={onSubmitHandeler}
          className=" bg-gray-400 px-3 py-3 rounded-md"
        >
          {loginForm ? "Login" : "Create Account"}
        </button>
      </div>
      <button onClick={onClickHaveAccount} className=" text-sm">
        {loginForm ? "Create New Account" : "Already Have Account"}
      </button>
    </form>
  );
}

export default LoginForm;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loginUserAct, logoutUserAct } from "../Store/Actions/authActions";
import { logoutUser } from "../Store/Reducer/authSlice";
import { buyPremiumAct } from "../Store/Actions/paymentActions";

function Header() {
  const { auth, premium } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logoutUserAct());
  };

  const onClickBuyPremium = () => {
    dispatch(buyPremiumAct());
  };

  return (
    <header className=" bg-gray-900 text-white h-16 flex  px-10 justify-between gap-5 items-center">
      <p>EXPENSE TRACKER</p>
      <div className=" flex justify-between gap-5">
        {!auth && (
          <NavLink to="/login" className=" hover:opacity-70  cursor-pointer">
            Login
          </NavLink>
        )}

        {auth && (
          <>
            <p
              onClick={onLogoutClick}
              className=" hover:opacity-70  cursor-pointer"
            >
              Logout
            </p>
            <NavLink to="/" className=" hover:opacity-70  cursor-pointer">
              Home
            </NavLink>
            {!premium && (
              <p
                onClick={onClickBuyPremium}
                className=" hover:opacity-70  cursor-pointer"
              >
                BUY PREMIUM
              </p>
            )}
          </>
        )}

        {premium && (
          <>
            <NavLink
              to="/leaderboard"
              className=" hover:opacity-70  cursor-pointer"
            >
              Leaderboard
            </NavLink>

            <p>Download Report</p>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

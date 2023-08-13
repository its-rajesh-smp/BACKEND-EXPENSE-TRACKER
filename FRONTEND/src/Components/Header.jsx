import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUserAct } from "../Store/Actions/authActions";
import { buyPremiumAct } from "../Store/Actions/paymentActions";
import { downloadExpenseAct } from "../Store/Actions/expenseActions";
import { BiLoaderCircle } from "react-icons/bi";

function Header() {
  const { auth, premium } = useSelector((state) => state.authSlice);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logoutUserAct());
  };

  const onClickBuyPremium = () => {
    dispatch(buyPremiumAct());
  };

  const onClickDownload = () => {
    if (!loader) {
      setLoader(true);
      dispatch(downloadExpenseAct(setLoader));
    }
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

            <p
              className=" flex items-center justify-center cursor-pointer "
              onClick={onClickDownload}
            >
              {loader ? (
                <BiLoaderCircle className=" animate-spin" />
              ) : (
                "Download Report"
              )}
            </p>

            <NavLink
              to="/reporthistory"
              className=" hover:opacity-70  cursor-pointer"
            >
              Report History
            </NavLink>
          </>
        )}

        {auth && (
          <p
            onClick={onLogoutClick}
            className=" hover:opacity-70  cursor-pointer"
          >
            Logout
          </p>
        )}
      </div>
    </header>
  );
}

export default Header;

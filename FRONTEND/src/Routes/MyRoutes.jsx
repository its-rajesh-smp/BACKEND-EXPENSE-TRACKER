import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import { useSelector } from "react-redux";
import LeaderboardPage from "../Pages/LeaderboardPage";
import ReportHistoryPage from "../Pages/ReportHistoryPage";

function MyRoutes() {
  const { auth, premium } = useSelector((state) => state.authSlice);

  return (
    <Routes>
      {auth ? (
        <>
          <Route element={<HomePage />} path="*" />
          <Route element={<HomePage />} path="/" />
          {premium && (
            <>
              <Route element={<LeaderboardPage />} path="/leaderboard" />
              <Route element={<ReportHistoryPage />} path="/reporthistory" />
            </>
          )}
        </>
      ) : (
        <>
          <Route element={<LoginPage />} path="/" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<LoginPage />} path="*" />
        </>
      )}
    </Routes>
  );
}

export default MyRoutes;

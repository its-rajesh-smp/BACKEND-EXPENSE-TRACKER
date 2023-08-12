import React from "react";

function LeaderboardUser({ name, totalExpense }) {
  return (
    <div className=" flex gap-5 p-5 bg-purple-300">
      <p>{name}</p>
      <p>{totalExpense}</p>
    </div>
  );
}

export default LeaderboardUser;

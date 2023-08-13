import React from "react";

import { GET_LEADERBOARD } from "../Api/endpoints";
import LeaderboardUser from "../Components/LeaderboardPage/LeaderboardUser";
import useFetch from "../Hooks/useFetch";

function LeaderboardPage() {
  const state = useFetch(GET_LEADERBOARD);

  return (
    <div className=" flex flex-col gap-5">
      {state.map((user) => (
        <LeaderboardUser
          key={user.email}
          name={user.name}
          totalExpense={user.totalExpense}
        />
      ))}
    </div>
  );
}

export default LeaderboardPage;

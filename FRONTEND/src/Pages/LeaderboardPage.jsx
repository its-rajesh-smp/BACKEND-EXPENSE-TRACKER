import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_LEADERBOARD } from "../Api/endpoints";
import LeaderboardUser from "../Components/LeaderboardPage/LeaderboardUser";

function LeaderboardPage() {
  const [state, setState] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(GET_LEADERBOARD);
      setState(data);
    })();
  }, []);

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

import { useEffect, useState } from "react";
import axios from "axios";
function useFetch(path) {
  const [state, setState] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const localIdToken = localStorage.getItem("expensetracker_idToken");
        if (!localIdToken) {
          return;
        }

        const { data } = await axios.get(path, {
          headers: { Authorization: localIdToken },
        });

        setState(data);
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    })();
  }, [path]);

  return state;
}

export default useFetch;

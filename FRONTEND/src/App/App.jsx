import MyRoutes from "../Routes/MyRoutes";
import "./App.css";
import Header from "../Components/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserAct } from "../Store/Actions/authActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAct());
  }, []);

  return (
    <div>
      <Header />
      <MyRoutes />
    </div>
  );
}

export default App;

import { useContext, useEffect, useState } from "react";
import "./index.css";
import Login from "./Components/Login";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import  UserContext from "./utils/userContext";
import Dashboard from "./Components/Dashboard";
import UserDashboard from "./Components/User/UserDashboard";

function App() {
  const [details, setDetails] = useState({
    userId: "",
    userName:"",
    role: "",
  });
  useEffect(() => {
    const storedData = sessionStorage.getItem("userDetails")
    setDetails(JSON.parse(storedData));
  }, [])
  

  return (
    <UserContext.Provider value={{details,setDetails}}>
      <Outlet /> 
    </UserContext.Provider>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/userdashboard/:userId",
        element: <UserDashboard />,
      },
    ],
  },
]);

export default appRouter;

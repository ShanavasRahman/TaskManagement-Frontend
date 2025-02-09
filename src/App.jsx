import { useState } from "react";
import "./index.css";
import Login from "./Components/Login";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./Components/Home";
import Signup from "./Components/Signup";

function App() {
  return <Outlet />;
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

export default appRouter;

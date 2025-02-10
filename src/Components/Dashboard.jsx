import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../utils/userContext";
import useAuth from "../utils/useAuth";
import UserDashboard from "./User/UserDashboard";
import AdminDashboard from "./Admin/AdminDashboard";

const Dashboard = () => {
  const { details } = useContext(UserContext);
  const isAuthenticate = useAuth();

  if (isAuthenticate == null) {
    return <h1>Loading..</h1>;
  }

  if (!isAuthenticate) {
    return <Navigate to="/login" replace />;
  }

  return details?.role === "user" ? <UserDashboard /> : <AdminDashboard />;
};

export default Dashboard;

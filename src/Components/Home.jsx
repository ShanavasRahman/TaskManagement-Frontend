import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../utils/userContext";

const Home = () => {
  const { details } = useContext(UserContext);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl text-center bg-gray-800 p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg border border-gray-700">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          {details && details.userId
            ? `Welcome, ${details.userName}!`
            : "Welcome to the Task Management App"}
        </h1>

        {/* Description */}
        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-300">
          {details && details.userId
            ? "Ready to manage your tasks? Start exploring!"
            : "Organize, prioritize, and conquer your tasks with ease. Login now to get started!"}
        </p>

        {/* Action Button */}
        <div className="mt-6">
          <Link to={details && details.userId ? "/dashboard" : "/login"}>
            <button className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-lg transition-colors shadow-md 
              bg-purple-600 hover:bg-purple-700 sm:bg-green-600 sm:hover:bg-green-700 text-white">
              {details && details.userId ? "Go to Dashboard" : "Login Now"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

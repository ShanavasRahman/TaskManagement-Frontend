import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../utils/userContext";



const Home = () => {
    const { details } = useContext(UserContext);

  // If details are not available (i.e., user is not logged in)
  if (!details || !details.userId) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-2xl text-center bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-700'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white font-poppins tracking-tight'>
            Welcome to the Task Management App
          </h1>

          <p className='mt-4 text-base sm:text-lg text-gray-300 font-montserrat'>
            Organize, prioritize, and conquer your tasks with ease. Login now to
            get started!
          </p>

          <div className='mt-6'>
            <Link to='/login'>
              <button className='px-5 py-2 sm:px-6 sm:py-3 bg-purple-600 text-white font-poppins font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md'>
                Login Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-2xl text-center bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-700'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white font-poppins tracking-tight'>
          Welcome, {details.userName}!
        </h1>

        <p className='mt-4 text-base sm:text-lg text-gray-300 font-montserrat'>
          Ready to manage your tasks? Start exploring!
        </p>

        <div className='mt-6'>
          <Link to='/dashboard'>
            <button className='px-5 py-2 sm:px-6 sm:py-3 bg-green-600 text-white font-poppins font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md'>
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default Home;

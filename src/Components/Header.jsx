import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className='bg-gray-900 text-white shadow-md sticky top-0 z-50'>
      <div className='container mx-auto px-6 py-4 flex items-center justify-between'>
        <h1 className='text-3xl md:text-4xl font-bold text-blue-500'>
          TaskMaster
        </h1>
        <div className='flex items-center space-x-4'>
          <Link to='/login'>
            <button className='bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all px-8 py-3 rounded-full text-white text-sm md:text-base font-semibold shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500'>
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

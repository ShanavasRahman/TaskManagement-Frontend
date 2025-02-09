import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../utils/userContext";

const Login = () => {
  const userDetails = {
    email: "",
    password: "",
    };
    
    const [user, setUser] = useState(userDetails);
    
  const handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUser({...user, [name]: value });
 };
    
    const navigate = useNavigate();
    const { setDetails, details } = useContext(UserContext);
    console.log(details);
    const handleSubmit = async (e) => {
        e.preventDefault(); 
      
        try {
          const response = await axios.post("http://localhost:3000/login", user, {
            withCredentials: true, 
          });
            
            setDetails(response.data.user);      
            sessionStorage.setItem("userDetails", JSON.stringify(response.data.user));
            toast.success(response.data.message, { position: "top-right" });
            navigate("/");
                
        } catch (error) {
          if (error.response) {
            toast.error(error.response.data.message || "Login failed!", { position: "top-right" });
          } else if (error.request) {
            toast.error("No response from server. Please try again.", { position: "top-right" });
          } else {
            toast.error("Something went wrong. Please try again.", { position: "top-right" });
          }
        }
      };
      return (
        <div className='flex min-h-screen items-center justify-center bg-gray-900 px-4'>
          <div className='w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6'>
            <h2 className='text-2xl font-semibold text-white text-center'>
              Welcome Back
            </h2>
            <p className='text-gray-300 text-sm text-center mt-2'>
              Login to access your account
            </p>
    
            <form className='mt-6 space-y-4' onSubmit={handleSubmit}>
              <div>
                <label className='text-gray-300 text-sm'>Email</label>
                <input
                  type='email'
                  name='email'
                  onChange={handleInput}
                  className='w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none'
                  placeholder='Enter your email'
                />
              </div>
    
              <div>
                <label className='text-gray-300 text-sm'>Password</label>
                <input
                  type='password'
                  name='password'
                  onChange={handleInput}
                  className='w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none'
                  placeholder='Enter your password'
                />
              </div>
    
              <button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-medium py-2 rounded-lg shadow-md'>
                Login
              </button>
            </form>
    
            <p className='text-gray-400 text-sm text-center mt-4'>
              Don't have an account?
              <Link className='text-blue-400 hover:underline' to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      );
};

export default Login;

import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Signup = () => {
    const newUser = {
        name: "",
        email: "",
        password: "",
        confirmPassword:""
    }
    const [user, setUser] = useState(newUser);

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            if (user.password != user.confirmPassword) {
               return toast.error("Please type same password")
            }
            const response=await axios.post("http://localhost:3000/login/signup")
        } catch (error) {
            
        }
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white text-center">
              Create an Account
            </h2>
            <p className="text-gray-300 text-sm text-center mt-2">
              Sign up to get started
            </p>
    
            <form className="mt-6 space-y-4" >
              {/* Name */}
              <div>
                <label className="text-gray-300 text-sm">Name</label>
                <input
                  type="text"
                            name="name"
                            onChange={handleInput}
                  className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>
    
              {/* Email */}
              <div>
                <label className="text-gray-300 text-sm">Email</label>
                <input
                  type="email"
                            name="email"
                            onChange={handleInput}
                  className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
    
              {/* Password */}
              <div>
                <label className="text-gray-300 text-sm">Password</label>
                <input
                  type="password"
                            name="password"
                            onChange={handleInput}
                  className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
    
              {/* Confirm Password */}
              <div>
                <label className="text-gray-300 text-sm">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handleInput}
                  className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Confirm your password"
                  required
                />
              </div>
    
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-medium py-2 rounded-lg shadow-md">
                Sign Up
              </button>
            </form>
    
            <p className="text-gray-400 text-sm text-center mt-4">
              Already have an account?
              <Link className="text-blue-400 hover:underline cursor-pointer"to="/">Login</Link>
            </p>
          </div>
        </div>
      );
}

export default Signup
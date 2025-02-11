import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value }); 
    };

    const validateInputs = () => {
        const nameRegex = /^[A-Za-z\s]{1,15}$/;
        const passwordRegex = /^(?=.*[\W_]).{6,10}$/; 

        if (!nameRegex.test(user.name)) {
            toast.error("Name must be within 15 characters and contain only letters.", { position: "top-right" });
            return false;
        }

        if (!passwordRegex.test(user.password)) {
            toast.error("Password must be 6-10 characters and contain at least one special character.", { position: "top-right" });
            return false;
        }

        if (user.password !== user.confirmPassword) {
            toast.error("Passwords do not match.", { position: "top-right" });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        try {
            const newUser = {
                name: user.name,
                email: user.email,
                password: user.password,
            };

            const response = await axios.post("https://taskmanagement-backend-iv84.onrender.com/signup", newUser);

            toast.success(response.data.message, { position: "top-right" });
            navigate("/login");
        } catch (error) {
            console.error("Signup Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Something went wrong", { position: "top-right" });
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6">
                <h2 className="text-2xl font-semibold text-white text-center">Create an Account</h2>
                <p className="text-gray-300 text-sm text-center mt-2">Sign up to get started</p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-gray-300 text-sm">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleInput}
                            className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-300 text-sm">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleInput}
                            className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-300 text-sm">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleInput}
                            className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-300 text-sm">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={handleInput}
                            className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-medium py-2 rounded-lg shadow-md"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-gray-400 text-sm text-center mt-4">
                    Already have an account?
                    <Link className="text-blue-400 hover:underline cursor-pointer" to="/login">
                       
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;

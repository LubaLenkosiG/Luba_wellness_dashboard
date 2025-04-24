"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaHospitalAlt, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const router=useRouter()
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      console.log("FormData :",formData)
      const response = await fetch("https://luba-backend.vercel.app/api/auth/register", {
        method: "POST",
        mode:"cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/")
        setSuccess("Sign up successful! You can now log in.");
        setFormData({ email: "", name: "", password: "" });
      } else {
        const { message } = await response.json();
        setError(message || "Failed to sign up. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="font-[sans-serif] bg-white h-screen">
      <div className="grid lg:grid-cols-2 gap-4 max-lg:gap-12 bg-gradient-to-r from-[#31135e] via-[#191970]  to-[#2d0e5b] sm:px-8 px-4 py-12 h-[320px]">
        <div>
          <Link href={"/"} className="flex items-center justify-start gap-2">
            <FaHospitalAlt size={30} className="text-white" />
            <div className="tracking-wide text-4xl text-white">
              Wellness-Watch
            </div>
          </Link>
          <div className="max-w-lg mt-16 max-lg:hidden ">
            <h3 className="text-3xl font-bold text-white">Sign Up</h3>
            <p className="text-sm mt-4 text-white">
              Track and improve your health with WellnessWatch - your
              personalized wellness companion. Utilizing the power of AI.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:px-6 px-4 py-8 max-w-md w-full h-max shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] max-lg:mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3 className="text-3xl font-extrabold text-gray-800">Sign Up</h3>
            </div>

            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-sm mb-4">{success}</p>
            )}

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-gray-800 text-sm mb-2 block">Name</label>
              <div className="relative flex items-center">
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter name"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-gray-800 text-sm mb-2 block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter password"
                />
                {showPassword ? (
                  <FaRegEyeSlash
                    size={25}
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaRegEye
                    size={25}
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>

            <div className="mt-4 text-right">
              <a
                href="jajvascript:void(0);"
                className="text-blue-600 text-sm font-semibold hover:underline"
              >
                Forgot your password?
              </a>
            </div>

            <div className="mt-8">
              <button
                type="button"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-md text-white bg-[#2d0e5b] hover:bg-blue-700 focus:outline-none"
            
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
            <p className="text-sm mt-6 text-center text-gray-800">
              Already have an account ?{" "}
              <a
                href="/signin"
                className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
              >
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

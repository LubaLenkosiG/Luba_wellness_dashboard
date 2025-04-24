"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaHospitalAlt, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { LuLoaderCircle } from "react-icons/lu";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");  
  const [success, setSuccess] = useState("");  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccess(""); 
    setLoading(true); // Show loader
    
    try {
      console.log("FormData:", formData);
      
      const response = await fetch("https://luba-backend.vercel.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response Data:", data);

      if (!response.ok || !data.sessionKey || !data.uuidKey) {
        setError(data.error || "Invalid credentials. Please try again.");
        setLoading(false); // Hide loader
        return;
      }

      sessionStorage.setItem("sessionKey", data.sessionKey);
      sessionStorage.setItem("uuidKey", data.uuidKey);
      setSuccess("Sign in successful!");

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/dashAdmin");
      }, 1000);

    } catch (err) {
      console.error("Error during sign-in:", err);
      setError("An error occurred. Please try again later.");
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="font-[sans-serif] bg-white h-screen">
      <div className="grid lg:grid-cols-2 gap-4 max-lg:gap-12 bg-gradient-to-r from-[#31135e] via-[#191970] to-[#2d0e5b] sm:px-8 px-4 py-12 h-[320px]">
        <div>
          <Link href={"/"} className="flex items-center justify-start gap-2">
            <FaHospitalAlt size={30} className="text-white" />
            <div className="tracking-wide text-4xl text-white">
              Wellness-Watch
            </div>
          </Link>
          <div className="max-w-lg mt-16 max-lg:hidden ">
            <h3 className="text-3xl font-bold text-white">Sign in</h3>
            <p className="text-sm mt-4 text-white">
              Track and improve your health with WellnessWatch - your
              personalized wellness companion. Utilizing the power of AI.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:px-6 px-4 py-8 max-w-md w-full h-max shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] max-lg:mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3 className="text-3xl font-extrabold text-gray-800">Sign in</h3>
            </div>

            <div className="mb-4">
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="Enter email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter password"
                  required
                />
                {showPassword ? (
                  <FaRegEyeSlash
                    size={25}
                    className="absolute right-4 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaRegEye
                    size={25}
                    className="absolute right-4 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>

            <div className="mt-4 text-right">
              <a href="javascript:void(0);" className="text-blue-600 text-sm font-semibold hover:underline">
                Forgot your password?
              </a>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 shadow-xl py-2.5 px-4 text-sm font-semibold rounded-md text-white bg-[#2d0e5b] hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LuLoaderCircle className="animate-spin" size={20} /> Logging in...
                  </>
                ) : (
                  "Log in"
                )}
              </button>
            </div>

            <p className="text-sm mt-6 text-center text-gray-800">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600 font-semibold hover:underline ml-1">
                Register here
              </a>
            </p>

            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
            {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

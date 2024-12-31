"use client";
import Link from "next/link";
import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/Api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      const { accessToken } = data;
      if (accessToken) {
        localStorage.setItem("token", accessToken);
        window.location.href = "/";
      } else {
        console.error("Access token not found in response");
      }
    } else {
      console.error("Error:", data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-800 to-black">
      <nav className="w-full bg-gray-900 flex items-center">
        <img
          src="/appLogo.png" // Update the path to your logo in the public folder
          alt="Logo"
          className="h-32 ml-10"
        />
      </nav>

      <div className="my-12 w-5/12 bg-gray-900 flex flex-col items-center rounded-lg py-10 p-5">
        <h1 className="text-4xl font-bold text-white text-center">
          Log in to Spotify
        </h1>

        <div className="mt-8 flex flex-col w-full items-center space-y-4">
          <button className="w-full max-w-sm flex items-center justify-center border border-gray-600 rounded-full px-4 py-2 hover:border-white">
            <img src="/googlelogo.svg" alt="Google" className="h-6 w-6" />
            <span className="ml-4 text-white">Continue with Google</span>
          </button>
          <button className="w-full max-w-sm flex items-center justify-center border border-gray-600 rounded-full px-4 py-2 hover:border-white">
            <img src="/facebooklogo.svg" alt="Facebook" className="h-6 w-6" />
            <span className="ml-4 text-white">Continue with Facebook</span>
          </button>
          <button className="w-full max-w-sm flex items-center justify-center border border-gray-600 rounded-full px-4 py-2 hover:border-white">
            <img src="/applelogo.svg" alt="Apple" className="h-6 w-6" />
            <span className="ml-4 text-white">Continue with Apple</span>
          </button>
        </div>

        <div className="w-10/12 border-t border-gray-600 my-8"></div>

        <form
          method="post"
          onSubmit={login}
          id="login_form"
          className="flex flex-col items-center w-full"
        >
          <div className="w-full max-w-sm mb-6">
            <label
              htmlFor="logEmail"
              className="block text-white font-medium mb-2"
            >
              Email or username
            </label>
            <input
              type="text"
              placeholder="Email or Username"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full border border-gray-600 rounded-md bg-transparent text-white px-4 py-2 focus:border-white focus:outline-none"
            />
          </div>
          <div className="w-full max-w-sm mb-6">
            <label
              htmlFor="logPass"
              className="block text-white font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full border border-gray-600 rounded-md bg-transparent text-white px-4 py-2 focus:border-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center mb-6 w-full max-w-sm">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className="mr-2"
            />
            <label htmlFor="remember" className="text-white">
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            className="w-full max-w-sm bg-green-500 text-white font-bold rounded-full py-2 hover:scale-105 transition-transform"
          >
            Log In
          </button>
        </form>

        <a
          href="#"
          className="mt-6 text-white hover:text-green-500 transition-colors"
        >
          Forgot your password?
        </a>

        <div className="w-10/12 border-t border-gray-600 my-8"></div>

        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Don't have an account?</span>
          <Link href="/Signup" className="text-green-500 hover:underline">
            Sign up for Spotify
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

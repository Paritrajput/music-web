"use client";
import { useUser } from "@/ContextApi/userContext";
import Image from "next/image";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavBar = () => {
  const { showmenu, setShowmenu, isLoggedIn, fetchUserDetails } = useUser();
  const router = useRouter();
  const { pathname } = usePathname();

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <nav className="sticky top-0 ">
      <div className="flex items-center h-16 justify-between bg-[#0e1010] rounded-t-lg p-4 ">
        <div className="flex items-center">
          <Image
            src="/logo_beatify.png"
            alt="Logo"
            width={100}
            height={70}
            className="h-10 w-auto"
          />

          {/* <span className="ml-4">
            <Image
              src="/images-removebg-preview (2).png"
              alt="Show All"
              width={20}
              height={20}
            />
          </span> */}
        </div>
        <div className="flex items-center gap-3 w-screen ">
          <ul className="flex space-x-6 text-gray-400 text-lg max-md:hidden font-medium">
            <li>
              <Link
                href="/"
                className={`${
                  pathname === "/"
                    ? "text-white font-bold fill-white"
                    : "text-gray-400 fill-gray-400"
                } hover:text-white  flex gap-1 items-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-7 w-7 hover:fill-white`}
                  viewBox="0,0,35,35"
                  fill="currentColor"
                >
                  <path d="M16,2.59375l-0.71875,0.6875l-13,13l1.4375,1.4375l1.28125,-1.28125v11.5625h9v-10h4v10h9v-11.5625l1.28125,1.28125l1.4375,-1.4375l-13,-13zM16,5.4375l9,9v11.5625h-5v-10h-8v10h-5v-11.5625z"></path>
                </svg>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                className={`${
                  pathname === "/search"
                    ? "text-white font-bold fill-white"
                    : "text-gray-400 fill-gray-400"
                } hover:text-white flex gap-1 items-center `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 hover:fill-white`}
                  viewBox="0,0,43,43"
                  fill="currentColor"
                >
                  <path d="M20.5,6c-7.98444,0 -14.5,6.51556 -14.5,14.5c0,7.98444 6.51556,14.5 14.5,14.5c3.27316,0 6.28892,-1.10698 8.7207,-2.94922l9.36523,9.36328c0.50163,0.52248 1.24653,0.73295 1.94742,0.55024c0.70088,-0.18271 1.24823,-0.73006 1.43094,-1.43094c0.18271,-0.70088 -0.02776,-1.44578 -0.55024,-1.94742l-9.36328,-9.36523c1.84224,-2.43179 2.94922,-5.44755 2.94922,-8.7207c0,-7.98444 -6.51556,-14.5 -14.5,-14.5zM20.5,10c5.82269,0 10.5,4.67732 10.5,10.5c0,2.79571 -1.08593,5.3206 -2.85156,7.19727c-0.17187,0.12442 -0.32284,0.2754 -0.44727,0.44727c-1.87707,1.76787 -4.40346,2.85547 -7.20117,2.85547c-5.82268,0 -10.5,-4.67732 -10.5,-10.5c0,-5.82268 4.67732,-10.5 10.5,-10.5z"></path>
                </svg>
                Search
              </Link>
            </li>
            <li className="ml:hidden">
              <Link
                href={isLoggedIn ? "/MyLibrary" : "Login"}
                className={`${
                  pathname === "/MyLibrary"
                    ? "text-white font-bold fill-white"
                    : "text-gray-400 fill-gray-400"
                } hover:text-white flex gap-1 items-center  `}
              >
                <svg
                  className={`h-6 w-6 hover:fill-white`}
                  viewBox="0,0,26,26"
                  fill="currentColor"
                >
                  <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
                </svg>
                Your Library
              </Link>
            </li>
            <span onClick={() => router.push("/AdminDashboard")}>Admin</span>
          </ul>

          <span className="max-md:hidden">|</span>
          <div>
            {isLoggedIn ? (
              <div>
                <img
                  src="/userProfile.png"
                  className="h-10"
                  onClick={() => {
                    router.push("/MyProfile");
                  }}
                />
              </div>
            ) : (
              <div className="md:gap-3 flex items-center">
                <span
                  onClick={() => router.push("/Signup")}
                  className="max-md:hidden "
                >
                  SignUp
                </span>

                <button
                  className="border-xl bg-white text-black font-bold rounded-3xl py-1 px-2 md:py-3 md:px-6"
                  onClick={() => router.push("/Login")}
                >
                  Login
                </button>
              </div>
            )}
          </div>
          <div
            className="md:hidden flex items-center gap-3"
            onClick={() => {
              setShowmenu(!showmenu);
            }}
          >
            {showmenu ? (
              <img src="/cross.png" className="h-8" />
            ) : (
              <img src="/showMenu.png" className="h-9" />
            )}
          </div>
        </div>
      </div>
      <div
        className={`${
          showmenu ? "flex" : "hidden"
        }  items-center gap-2 justify-center md:hidden `}
      >
        <ul className="flex items-center justify-evenly w-full space-x-6 text-gray-400 text-lg font-medium ">
          <li>
            <Link
              href="/"
              className={`${
                pathname === "/" ? "fill-white" : "fill-gray-400"
              } hover:text-white `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-7 w-7 hover:fill-white`}
                viewBox="0,0,35,35"
                fill="currentColor"
              >
                <path d="M16,2.59375l-0.71875,0.6875l-13,13l1.4375,1.4375l1.28125,-1.28125v11.5625h9v-10h4v10h9v-11.5625l1.28125,1.28125l1.4375,-1.4375l-13,-13zM16,5.4375l9,9v11.5625h-5v-10h-8v10h-5v-11.5625z"></path>
              </svg>
            </Link>
          </li>
          <li>
            <Link
              href="/search"
              className={`${
                pathname === "/search" ? "fill-white " : "fill-gray-400"
              } hover:text-white `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 hover:fill-white`}
                viewBox="0,0,43,43"
                fill="currentColor"
              >
                <path d="M20.5,6c-7.98444,0 -14.5,6.51556 -14.5,14.5c0,7.98444 6.51556,14.5 14.5,14.5c3.27316,0 6.28892,-1.10698 8.7207,-2.94922l9.36523,9.36328c0.50163,0.52248 1.24653,0.73295 1.94742,0.55024c0.70088,-0.18271 1.24823,-0.73006 1.43094,-1.43094c0.18271,-0.70088 -0.02776,-1.44578 -0.55024,-1.94742l-9.36328,-9.36523c1.84224,-2.43179 2.94922,-5.44755 2.94922,-8.7207c0,-7.98444 -6.51556,-14.5 -14.5,-14.5zM20.5,10c5.82269,0 10.5,4.67732 10.5,10.5c0,2.79571 -1.08593,5.3206 -2.85156,7.19727c-0.17187,0.12442 -0.32284,0.2754 -0.44727,0.44727c-1.87707,1.76787 -4.40346,2.85547 -7.20117,2.85547c-5.82268,0 -10.5,-4.67732 -10.5,-10.5c0,-5.82268 4.67732,-10.5 10.5,-10.5z"></path>
              </svg>
            </Link>
          </li>
          <li>
            <Link
              href={isLoggedIn ? "/MyLibrary" : "/Login"}
              className={`${
                pathname === "/MyLibrary" ? "fill-white " : "fill-gray-400"
              } hover:text-white `}
            >
              <svg
                className={`h-6 w-6 hover:fill-white`}
                viewBox="0,0,26,26"
                fill="currentColor"
              >
                <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
              </svg>
            </Link>
          </li>
          <li>
            <Link
              href={isLoggedIn ? "/CreatePlaylist" : "/Login"}
              className={`${
                pathname === "/CreatePlaylist"
                  ? "fill-white font-bold"
                  : "fill-gray-400"
              } hover:text-white text-4xl `}
            >
              +
            </Link>
          </li>
          <li>
            <Link href="/AdminDashboard">
              <img src="/admin-icon.png"></img>
            </Link>
          </li>
        </ul>
      </div>
      {/* <div className="flex space-x-6 text-gray-400 text-lg font-medium">
        <Link href="/errorPage" className="hover:text-white hover:underline">
          Premium
        </Link>
        <Link href="/errorPage" className="hover:text-white hover:underline">
          Support
        </Link>
        <Link href="/errorPage" className="hover:text-white hover:underline">
          Download
        </Link>
      </div> */}
    </nav>
  );
};

export default NavBar;

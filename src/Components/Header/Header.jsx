// components/NavBar.js
"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For App Router
import { useState } from "react";

const NavBar = () => {
  const [showmenu, setShowmenu] = useState(false);
  const router = useRouter();
  return (
    <nav className="sticky top-0 ">
      <div className="flex items-center h-16 justify-between bg-[#0e1010] rounded-t-lg p-4 ">
        <div className="flex items-center">
          <Image src="/appLogo.png" alt="Logo" width={120} height={50} />

          {/* <span className="ml-4">
            <Image
              src="/images-removebg-preview (2).png"
              alt="Show All"
              width={20}
              height={20}
            />
          </span> */}
        </div>
        <div className="flex items-center gap-3 max-md:hidden">
          <ul className="flex space-x-6 text-gray-400 text-lg font-medium">
            <li>
              <Link
                href="/"
                className={`${
                  router.asPath === "/"
                    ? "text-white font-bold"
                    : "text-gray-400"
                } hover:text-white `}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                className={`${
                  router.asPath === "/search"
                    ? "text-white font-bold"
                    : "text-gray-400"
                } hover:text-white `}
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                href="/MyLibrary"
                className={`${
                  router.asPath === "/MyLibrary"
                    ? "text-white font-bold"
                    : "text-gray-400"
                } hover:text-white `}
              >
                My Library
              </Link>
            </li>
          </ul>
          <span onClick={() => router.push("/Admin")}>Admin</span>
          <span>|</span>
          <div className="gap-3 flex items-center">
            <span onClick={() => router.push("/Signup")}>SignUp</span>

            <button
              className="border-xl bg-white text-black font-bold rounded-3xl py-3 px-6"
              onClick={() => router.push("/Login")}
            >
              Login
            </button>
          </div>
        </div>
        <div
          className="md:hidden "
          onClick={() => {
            setShowmenu(!showmenu);
          }}
        >
          {showmenu ? (
            <img src="cross.png" className="h-10" />
          ) : (
            <img src="showMenu.png" className="h-10" />
          )}
        </div>
      </div>
      <div
        className={`${
          showmenu ? "content" : "hidden"
        } flex items-center gap-2 justify-center md:hidden `}
      >
        <ul className="flex space-x-6 text-gray-400 text-lg font-medium ">
          <li>
            <Link
              href="/"
              className={`${
                router.asPath === "/" ? "text-white font-bold" : "text-gray-400"
              } hover:text-white `}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/search"
              className={`${
                router.asPath === "/search"
                  ? "text-white font-bold"
                  : "text-gray-400"
              } hover:text-white `}
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              href="/createplaylists"
              className={`${
                router.asPath === "/createplaylists"
                  ? "text-white font-bold"
                  : "text-gray-400"
              } hover:text-white `}
            >
              Create
            </Link>
          </li>
        </ul>
        <span>|</span>
        <div className="gap-3 flex items-center">
          <span class="signup" id="sinup">
            SignUp
          </span>

          <button
            class="login_button"
            id="log_button "
            className="border-xl bg-white text-black  rounded-3xl py-3 px-6"
          >
            Login
          </button>
        </div>
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

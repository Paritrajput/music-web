"use client";
import { useUser } from "@/ContextApi/userContext";
import { Router } from "next/navigation";
import React from "react";

function myProfile() {
  const { isLoggedIn, setIsLoggedIn, user, setUser, showFooter } = useUser();
  const router = Router;
  const logout = async () => {
    try {
      const response = await fetch("/Api/logout", { method: "POST" });
      if (response.ok) {
        setUser(null);
        setIsLoggedIn(false);
        router.push("/");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div
      className={`${
        showFooter ? "h-[78vh]" : "h-[89vh]"
      }  m-1 bg-[linear-gradient(180deg,#535151_0%,#1a1b1f_91%)] rounded-[10px]  w-full `}
    >
      <div className="h-14 bg-[#0e1010] rounded-tr-[9px] rounded-tl-[9px] p-3 text-3xl font-bold">
        My Profile
      </div>
      <div className="p-5">
        <div className="flex gap-10 items-center">
          <img src="/userProfile.png"></img>
          <div className="text-xl font-bold">Username: {user}</div>
        </div>
        <button
          className="bg-white text-black rounded-3xl p-3 py-2"
          onClick={() => {
            logout();
          }}
        >
          LogOut
        </button>
      </div>
    </div>
  );
}

export default myProfile;

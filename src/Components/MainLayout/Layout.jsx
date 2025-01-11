"use client";

import { useMusicPlayer } from "@/ContextApi/playContext";

import NavBar from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import Mylibrary from "@/Components/MyLibrary/MyLibrary";
import { useUser } from "@/ContextApi/userContext";

export default function MainLayout({ children }) {
  const { showFooter } = useMusicPlayer();
  const { showmenu } = useUser();

  return (
    <div className="fixed w-screen h-screen flex flex-col">
      <NavBar />
      <div className={`flex-1 flex bg-black relative max-h-[90vh]`}>
        <Mylibrary />
        {children}
      </div>
      <Footer />
    </div>
  );
}

// components/MainContainer.js
"use client";

import NavBar from "@/Components/Header/Header";
import Artists from "@/Components/Main/Artists";
import Footer from "@/Components/Main/Footer";
import MyPlaylists from "@/Components/Main/Myplaylist";
import Playlists from "@/Components/Main/Playlists";
import { useMusicPlayer } from "@/ContextApi/playContext";

const MainContainer = () => {
  const { showFooter } = useMusicPlayer();
  return (
    <div
      className={` h-[99%]  m-1 bg-[linear-gradient(180deg,rgb(42_42_42),rgb(15_15_15))] rounded-[10px]  w-full `}
    >
      <div className="bg-[#101010] h-15 text-2xl font-bold p-3 rounded-tr-[10px] rounded-tl-[10px] ">
        Browse Playlists
      </div>
      <div className="flex-1 h-5/6  overflow-y-auto p-6 pl-2  overflow-x-hidden">
        <div className="">
          <Playlists />
          <MyPlaylists />
          <Artists />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainContainer;

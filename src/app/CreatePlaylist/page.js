"use client";
import Image from "next/image";
import { useState } from "react";

const createPlaylist = () => {
  const [uploadedImage, setUploadedImage] = useState(
    "/myplaylistIconDefault.png"
  );

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden bg-[linear-gradient(180deg,rgb(42_42_42),rgb(15_15_15))] rounded-[10px] m-1">
      <div className="categoryInfo">
        {/* Category Details */}
        <div className="categoryDetail flex p-4 text-white bg-[linear-gradient(0deg,#535151,#1a1b1f)] gap-8">
          {/* Upload Section */}
          <div className="uploadImg">
            <div
              id="uploadedImageContainer"
              className="flex flex-col items-center"
            >
              <Image
                id="uploadedImage"
                src={uploadedImage}
                alt="Uploaded Image"
                width={180}
                height={180}
                className="border border-black rounded"
              />
            </div>
            <form id="uploadForm" className="mt-2">
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                className="block w-full text-sm text-gray-500 bg-gray-700 rounded border-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-gray-500 file:text-white hover:file:bg-gray-600"
                onChange={handleFileUpload}
              />
            </form>
          </div>
          {/* Category Name and Edit Button */}
          <span className="flex items-center gap-2">
            <span className="categoryName2 text-6xl">Category Name</span>
            <Image
              src="/editPlaylist.png"
              alt="Edit"
              height={40}
              width={40}
              className="cursor-pointer"
            />
          </span>
        </div>

        {/* Search Section */}
        <div className="play_search flex items-center gap-2 p-4 bg-gray-800">
          <Image
            src="/download__2_-removebg-preview.png"
            alt="Search Icon"
            height={24}
            width={24}
            className="simage"
          />
          <input
            type="search"
            placeholder="What do you want to listen to?"
            className="playlist_search flex-1 p-2 bg-gray-700 text-white rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Playlist Section */}
        <div className="playlist p-4">
          {/* Dynamic playlist items can go here */}
        </div>

        <h2 className="h2 text-white text-xl mt-4 p-3">Selected Songs</h2>
        <div className="selectedSongs text-white p-3"></div>

        <button className="createPlaylistButton button01 mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          Create Playlist
        </button>
      </div>

      {/* Footer Info */}
      <div className="info mt-8 text-gray-400 p-3">
        <div className="main_info grid grid-cols-3 gap-4">
          <div className="info1">
            <span className="info_a font-semibold">Company</span>
            <span className="info_b block">About</span>
            <span className="info_b block">Jobs</span>
            <span className="info_b block">For the Record</span>
          </div>
          <div className="info2">
            <span className="info_a font-semibold">Communities</span>
            <span className="info_b block">For Artists</span>
            <span className="info_b block">Vendors</span>
            <span className="info_b block">Developers</span>
            <span className="info_b block">Investors</span>
            <span className="info_b block">Advertising</span>
          </div>
          <div className="info3">
            <span className="info_a font-semibold">Useful links</span>
            <span className="info_b block">Support</span>
            <span className="info_b block">Free Mobile App</span>
          </div>
        </div>
        <span className="info4 flex gap-4 mt-4">
          <Image src="/twiter.png" alt="Twitter" height={42} width={42} />
          <Image
            src="/images-removebg-preview (6).png"
            alt="Social Icon 1"
            height={33}
            width={33}
          />
          <Image
            src="/images-removebg-preview (5).png"
            alt="Social Icon 2"
            height={42}
            width={42}
          />
        </span>
      </div>
      <div className="sap1 border-t border-gray-700 my-4"></div>
      <div className="end_text text-center text-gray-500 text-sm">
        © 2024 Spotify AB
      </div>
    </div>
  );
};

export default createPlaylist;

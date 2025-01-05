"use client";

import { useUser } from "@/ContextApi/userContext";
import { useEffect, useState } from "react";

const createPlaylist = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [selectedSongsId, setSelectedSongsId] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [coverImg, setCoverImg] = useState(null);
  const [allArtists, setAllArtists] = useState("");
  const [artists, setArtists] = useState("");
  const [songNumber, setSongNumber] = useState(0);
  const [duration, setDuration] = useState(0);
  const { showFooter } = useUser();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      if (searchQuery == "") {
        return;
      }
      const response = await fetch(
        `/Api/admin/searchSong?search=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch songs");
      }
      const data = await response.json();
      setSongs(data.songs || []);
    } catch (error) {
      console.error("Error searching for songs:", error);
    }
  };

  useEffect(() => {
    if (searchQuery === "") {
      setSongs([]);
    } else {
      handleSearch();
    }
  }, [searchQuery]);

  const selectNewSong = (song) => {
    if (!selectedSongs.some((s) => s._id === song._id)) {
      setSelectedSongs((prev) => [...prev, song]);
      setSelectedSongsId((prev) => [...prev, song._id]);
      setAllArtists((prev) => [...prev, song.artists]);
      setArtists([...new Set(allArtists.flat())]);
    }
  };
  const removeSelectedSong = (songId) => {
    setSelectedSongs((prev) => prev.filter((song) => song._id !== songId));
    setSelectedSongsId((prev) => prev.filter((id) => id !== songId));
  };
  useEffect(() => {
    const totalDuration = selectedSongs.reduce(
      (sum, song) => sum + song.duration,
      0
    );

    setDuration(totalDuration);
  }, [selectedSongs]);

  const formData = new FormData();
  formData.append("title", playlistName);
  formData.append("artists", JSON.stringify(artists)); // Send as JSON string
  formData.append("coverImg", coverImg);
  formData.append("songIds", JSON.stringify(selectedSongsId)); // Send as JSON string
  formData.append("songNumber", songNumber);
  formData.append("duration", parseFloat(duration));
  const addPlaylist = async () => {
    try {
      const response = await fetch("/Api/user/addMyPlaylist", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Playlist added successfully");
      } else {
        const errorData = await response.json();
        console.error("Error adding playlist:", errorData.error);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div
      className={`${
        showFooter ? "h-[78vh]" : "h-[89vh]"
      }  m-1 overflow-y-auto overflow-x-hidden bg-[linear-gradient(180deg,rgb(42_42_42),rgb(15_15_15))] rounded-[10px]  w-full `}
    >
      <div className="categoryInfo">
        {/* Category Details */}
        <div className=" flex p-4 text-white bg-[linear-gradient(0deg,#535151,#1a1b1f)] gap-1 md:gap-8">
          {/* Upload Section */}
          <div className="">
            <div className="flex flex-col items-center h-32 w-32 md:w-44 md:h-44">
              <img
                id="uploadedImage"
                src={coverImg}
                alt="Uploaded Image"
                className="border border-black rounded h-32 w-32 md:w-44 md:h-44 "
              />
            </div>
            <form id="uploadForm" className="mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverImg(e.target.files[0])}
                className="block w-full text-sm text-gray-500 bg-gray-700 rounded border-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-gray-500 file:text-white hover:file:bg-gray-600"
              />
            </form>
          </div>
          {/* Category Name and Edit Button */}
          <div className="flex items-center gap-2 max-md:flex-col">
            <span className=" text-2xl md:text-6xl">Category Name</span>

            <input
              type="text"
              value={playlistName}
              placeholder="enter playlist title"
              className="p-2 rounded-3xl text-black max-ss:w-full"
              onChange={(e) => setPlaylistName(e.target.value)}
            />
            <img
              src="/editPlaylist.png"
              alt="Edit"
              height={40}
              width={40}
              className="cursor-pointer max-md:hidden"
            />
          </div>
        </div>

        {/* Search Section */}
        <div className="play_search flex items-center gap-2 p-4 bg-gray-800">
          <img
            src="/search-icon.svg"
            alt="Search Icon"
            height={24}
            width={24}
            className="fill-white"
          />
          <input
            type="search"
            placeholder="What do you want to listen to?"
            className=" flex-1 p-2 bg-gray-700 text-white rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Playlist Section */}
        {songs.length > 0 && (
          <div className="p-2">
            <h1>Search Results</h1>
            <ul className="overflow-y-scroll max-h-56">
              {songs.map((song, index) => (
                <li key={song._id} onClick={() => selectNewSong(song)}>
                  <div className="flex bg-[rgb(16,14,14)] shadow-[6px_4px_25px_2px_rgba(0,0,0,1)] cursor-pointer text-[white] w-4/5 min-w-fit box-border items-center justify-between m-1 p-[5px] ml-5">
                    <div className="flex items-center ">
                      <div>{index + 1}</div>
                      <img
                        src={song.coverImg}
                        alt={`${song.title} cover`}
                        className="h-10 w-auto rounded-[5px] px-3"
                      />
                      <div className="px-3">
                        {song.title} - {song.artists}
                      </div>
                    </div>
                    <div>
                      <img className="h-7" src="/addImg.png" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedSongs.length > 0 && (
          <div className="p-2 ">
            <h1>Selected Songs</h1>
            <ul className="overflow-y-scroll max-h-56">
              {selectedSongs.map((song, index) => (
                <li key={song._id}>
                  <div className="flex bg-[rgb(16,14,14)] shadow-[6px_4px_25px_2px_rgba(0,0,0,1)] cursor-pointer text-[white] w-4/5 min-w-fit box-border items-center justify-between m-1 p-[5px] ml-5 px-2">
                    <div className="flex items-center ">
                      <div>{index + 1}</div>
                      <img
                        src={song.coverImg}
                        alt={`${song.title} cover`}
                        className="h-10 w-auto rounded-[5px] px-3"
                      />
                      <div className="px-3">
                        {song.title} - {song.artists}
                      </div>
                    </div>
                    <div
                      className=""
                      onClick={() => removeSelectedSong(song._id)}
                    >
                      <img className="h-7" src="/cancelImg.png" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedSongs.length > 0 && (
          <button
            className="createPlaylistButton button01 ml-3 mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={addPlaylist}
          >
            Create Playlist
          </button>
        )}
      </div>

      {/* Footer Info */}
      {/* <div className="info mt-8 text-gray-400 p-3">
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
          <img src="/twiter.png" alt="Twitter" height={42} width={42} />
          <img
            src="/images-removebg-preview (6).png"
            alt="Social Icon 1"
            height={33}
            width={33}
          />
          <img
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
      </div> */}
    </div>
  );
};

export default createPlaylist;

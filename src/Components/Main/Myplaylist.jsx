"use client";
import { useUser } from "@/ContextApi/userContext";
import { useEffect, useState } from "react";
import React from "react";

const MyPlaylists = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { myPlaylists, setMyPlaylists, isLoggedIn } = useUser();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!isLoggedIn) {
        setMyPlaylists([]);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("/Api/user/getMyPlaylists");
        if (!response.ok) {
          throw new Error("Failed to fetch playlists");
        }
        const data = await response.json();
        setMyPlaylists(data.playlists);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [isLoggedIn, setMyPlaylists]);

  if (loading) {
    return (
      <div className="flex flex-wrap mt-3 ss:mt-4 space-x-1 ss:space-x-4">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="ss:w-48 ss:h-72 w-32 h-52 bg-gray-800 rounded-md ss:rounded-xl animate-pulse"
            ></div>
          ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-white">Error: {error}</div>;
  }

  if (!isLoggedIn || !myPlaylists || myPlaylists.length === 0) {
    return null;
  }

  const playlistsToShow = showAll ? myPlaylists : myPlaylists.slice(0, 5);

  return (
    <div className="p-0 ss:p-4 rounded-t-lg mb-5">
      <div className="flex justify-between items-center">
        <div className="text-white text-xl font-semibold">My Playlists</div>
        {myPlaylists.length > 5 && (
          <span
            className="text-white cursor-pointer"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </span>
        )}
      </div>
      <div className="flex flex-wrap mt-3 ss:mt-4 space-x-1 ss:space-x-4">
        {playlistsToShow.map((playlist) => (
          <div
            key={playlist._id}
            className="ss:w-48 ss:h-72 w-32 h-52 text-white relative mb-2 ss:m-3 rounded-md ss:rounded-xl transform hover:scale-105 transition-transform duration-300 ease-out"
          >
            <div className="ss:w-48 w-32 h-52 bg-[#121212de] ss:h-72 rounded-md ss:rounded-xl pt-1">
              <img
                src={playlist.coverImg}
                alt={playlist.title}
                className="ss:h-40 h-28 m-auto rounded-md ss:rounded-xl mt-1 ss:mt-3"
              />
              <div className="w-full p-2 ss:p-4 pt-2 flex flex-col justify-start h-20 ss:h-28">
                <h2 className="ss:text-[large] font-medium truncate-2-lines">
                  {playlist.title}
                </h2>
                <p className="text-[small] ss:text-[medium] font-normal text-gray-300 truncate-2-lines">
                  {playlist.description || "No description available."}
                </p>
              </div>
            </div>
            <div className="ss:w-48 ss:h-72 w-32 h-52 bg-black/20 opacity-0 absolute cursor-pointer m-0 p-0 rounded-[10px] top-0 hover:opacity-100">
              <img
                src="download-removebg-preview (9).png"
                alt="Play Button"
                className="ss:h-12 ss:w-12 h-7 w-7 m-auto absolute top-[90px] ss:top-[130px] right-3 ss:right-4"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPlaylists;

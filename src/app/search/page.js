"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/ContextApi/userContext";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);

  const [myPlaylists, setMyPlaylists] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const [artists, setArtists] = useState([]);
  const { showFooter, currentSongIndex, isPlaying } = useUser();

  const router = useRouter();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      if (searchQuery == "") {
        return;
      }
      const songResponse = await fetch(
        `/Api/user/search?search=${encodeURIComponent(searchQuery)}`
      );
      if (!songResponse.ok) {
        throw new Error("Failed to fetch songs");
      }
      const data = await songResponse.json();
      setSongs([...data.songs] || []);
      setArtists([...data.artists] || []);
      setPlaylists([...data.playlists] || []);
      setMyPlaylists([...data.myPlaylists] || []);
    } catch (error) {
      console.error("Error searching for songs:", error);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);
  useEffect(() => {
    setArtists([]);
    setMyPlaylists([]);
    setPlaylists([]);
    setSongs([]);
  }, [searchQuery == ""]);

  return (
    <div
      className={`${
        showFooter ? "h-[78vh]" : "h-[89vh]"
      }  m-1  bg-[linear-gradient(180deg,rgb(42_42_42),rgb(15_15_15))] rounded-[10px]  w-full `}
    >
      <div className="bg-[#101010] h-15  p-3 rounded-tr-[10px] rounded-tl-[10px] ">
        <div className="text-2xl font-bold mb-1">Search Playlists</div>

        <div className="relative w-full">
          <Image
            src="/download__2_-removebg-preview.png"
            alt="Search Icon"
            width={24}
            height={24}
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          />
          <input
            type="search"
            placeholder="What do you want to listen to?"
            className="w-full h-10 pl-12 pr-4 text-white bg-gray-700 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="h-[80%] overflow-y-scroll overflow-x-hidden">
        <div>
          {playlists.length > 0 ? (
            <div className=" p-4 rounded-t-lg">
              <div className="flex  items-center">
                <div className="text-white text-xl font-semibold">
                  Spotify Playlists
                </div>
              </div>
              <div className="flex flex-wrap mt-3 ss:mt-4 space-x-1 ss:space-x-4">
                {playlists.map((playlist) => (
                  <div
                    key={playlist._id} // Always include a unique key when rendering lists
                    className="ss:w-48 ss:h-72 w-32 h-52 text-white relative mb-2 ss:m-3 rounded-md ss:rounded-xl"
                    onClick={() => router.push(`/playlist/${playlist._id}`)}
                  >
                    <div className="ss:w-48  w-32 h-52 bg-[#121212de] ss:h-72 text-[white] rounded-md ss:rounded-xl pt-1">
                      <img
                        src={playlist.coverImg}
                        alt={playlist.title} // Add alt text for better accessibility
                        className="ss:h-40 h-28 m-auto rounded-md ss:rounded-xl mt-1 ss:mt-3"
                      />
                      <div className="w-full p-2 ss:p-4 pt-2 flex flex-col justify-start h-20 ss:h-28 text-ellipsis">
                        <h2 className="ss:text-[large] font-medium">
                          {playlist.title}
                        </h2>
                        <p className="text-[small] ss:text-[medium]  font-normal text-ellipsis overflow-hidden">
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
          ) : (
            ""
          )}
        </div>

        <div>
          {myPlaylists.length > 0 ? (
            <div className=" p-4 rounded-t-lg">
              <div className="flex  items-center">
                <div className="text-white text-xl font-semibold">
                  My Playlists
                </div>
              </div>
              <div className="flex flex-wrap mt-4 space-x-4">
                {myPlaylists.map((playlist) => (
                  <div
                    key={playlist._id} // Always include a unique key when rendering lists
                    className="ss:w-48 ss:h-72 w-32 h-52 text-white relative mb-2 ss:m-3 rounded-md ss:rounded-xl"
                    onClick={() => router.push(`/playlist/${playlist._id}`)}
                  >
                    <div className="ss:w-48  w-32 h-52 bg-[#121212de] ss:h-72 text-[white] rounded-md ss:rounded-xl pt-1">
                      <img
                        src={playlist.coverImg}
                        alt={playlist.title} // Add alt text for better accessibility
                        className="ss:h-40 h-28 m-auto rounded-md ss:rounded-xl mt-1 ss:mt-3"
                      />
                      <div className="w-full p-2 ss:p-4 pt-2 flex flex-col justify-start h-20 ss:h-28 text-ellipsis">
                        <h2 className="ss:text-[large] font-medium">
                          {playlist.title}
                        </h2>
                        <p className="text-[small] ss:text-[medium]  font-normal text-ellipsis overflow-hidden">
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
          ) : (
            ""
          )}
        </div>

        <div>
          {artists.length > 0 ? (
            <div className=" p-4 rounded-t-lg">
              <div className="flex  items-center">
                <div className="text-white text-xl font-semibold">Artists</div>
              </div>
              <div className="flex flex-wrap mt-4 space-x-4">
                {artists.map((artist) => (
                  <div
                    key={artist._id} // Always include a unique key when rendering lists
                    className="ss:w-48 ss:h-72 w-32 h-52 text-white relative mb-2 ss:m-3 rounded-md ss:rounded-xl"
                    onClick={() => router.push(`/playlist/${playlist._id}`)}
                  >
                    <div className="ss:w-48  w-32 h-52 bg-[#121212de] ss:h-72 text-[white] rounded-md ss:rounded-xl pt-1">
                      <img
                        src={artist.coverImg}
                        alt={artist.title} // Add alt text for better accessibility
                        className="ss:h-40 h-28 m-auto rounded-full ss:rounded-xl mt-1 ss:mt-3"
                      />
                      <div className="w-full p-2 ss:p-4 pt-2 flex flex-col justify-start h-20 ss:h-28 text-ellipsis">
                        <h2 className="ss:text-[large] font-medium">
                          {artist.title}
                        </h2>
                        <p className="text-[small] ss:text-[medium]  font-normal text-ellipsis overflow-hidden">
                          {artist.description || "No description available."}
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
          ) : (
            ""
          )}
        </div>
        {songs.length > 0 && (
          <div>
            <span>Songs</span>
            <ul className="pr-1 w-full p-1 pr-3">
              {songs.map((song, index) => (
                <li
                  key={index}
                  className={`song-item ${
                    currentSongIndex === index ? "active" : ""
                  }`}
                >
                  <div className="flex bg-[rgb(16,14,14)] shadow-[2px_3px_5px_2px_rgba(0,0,0,1)] cursor-pointer text-[white] w-full ss:w-4/5 min-w-fit box-border items-center justify-between m-1 p-[5px] ss:ml-5">
                    <div
                      className="flex justify-between w-[90%] items-center pl-1"
                      onClick={() => loadSong(index)}
                    >
                      <div
                        className="flex items-center "
                        // onClick={() => loadSong(index)}
                      >
                        <div>{index + 1}</div>
                        <img
                          src={song.coverImg}
                          alt={`${song.title} cover`}
                          className="h-10 w-auto rounded-[5px] px-3"
                        />
                        <div
                          className="px-3 hover:underline"
                          onClick={() =>
                            router.push(`/songs/${song._id}/${index}`)
                          }
                        >
                          {song.title} - {song.artists}
                        </div>
                      </div>
                      <div>
                        {`${
                          Math.floor(song.duration / 60) < 10 ? "0" : ""
                        }${Math.floor(song.duration / 60)}:${
                          Math.floor(song.duration % 60) < 10 ? "0" : ""
                        }${Math.floor(song.duration % 60)}`}
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        if (showFooter) {
                          playPause();
                        }
                      }}
                      className="z-50 disabled"
                    >
                      {isPlaying ? (
                        <img className="h-7 " src="/pause.png" />
                      ) : (
                        <img className="h-7 " src="/play.png" />
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

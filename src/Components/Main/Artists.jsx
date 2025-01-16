"use client";
import { useEffect, useState } from "react";
import React from "react";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch("/Api/user/getArtists");
        if (!response.ok) {
          throw new Error("Failed to fetch Artists");
        }
        const data = await response.json();
        setArtists(data.artists);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const artistsToShow = showAll ? artists : artists.slice(0, 5);

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
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-0 ss:p-4 rounded-t-lg mb-5">
      <div className="flex justify-between items-center">
        <div className="text-white text-xl font-semibold">Artists</div>
        {artists.length > 5 && (
          <span
            className="text-white cursor-pointer"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </span>
        )}
      </div>
      <div className="flex flex-wrap mt-3 ss:mt-4 space-x-1 ss:space-x-4">
        {artistsToShow.map((artist) => (
          <div
            key={artist._id} // Always include a unique key when rendering lists
            className="ss:w-48 ss:h-72 w-32 h-52 text-white relative mb-2 ss:m-3 rounded-md ss:rounded-xl transform hover:scale-105 transition-transform duration-300 ease-out"
          >
            <div className="ss:w-48 w-32 h-52 bg-[#121212de] ss:h-72 rounded-md ss:rounded-xl pt-1">
              <img
                src={artist.coverImg}
                alt={artist.title} // Add alt text for better accessibility
                className="ss:h-40 h-28 m-auto rounded-full mt-1 ss:mt-3"
              />
              <div className="w-full p-2 ss:p-4 pt-2 flex flex-col justify-start h-20 ss:h-28">
                <h2 className="ss:text-[large] font-medium truncate-2-lines">
                  {artist.title}
                </h2>
                <p className="text-[small] ss:text-[medium] font-normal text-gray-300 truncate-2-lines">
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
  );
};

export default Artists;

import SearchSongs from "@/Components/Admin/AddPlaylist";
import AddSong from "@/Components/Admin/AddSong";
import React from "react";

function page() {
  return (
    <div>
      <div className="h-14 bg-gray-900 w-full text-3xl font-bold p-2">
        Dashboard
      </div>
      <AddSong />
      <SearchSongs />
    </div>
  );
}

export default page;

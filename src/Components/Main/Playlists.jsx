// components/Playlists.js
const Playlists = () => {
  return (
    <div className=" p-6 rounded-t-lg">
      <div className="flex justify-between items-center">
        <div className="text-white text-xl font-semibold">
          Spotify Playlists
        </div>
        <span className="text-white cursor-pointer">Show All</span>
      </div>
      <div className="flex flex-wrap mt-4 space-x-4">
        {/* Dynamically generate playlists */}
        <div className="bg-gray-600 p-4 w-44 h-64 rounded-lg text-white hover:bg-gray-500">
          {/* Playlist Image */}
          <div className="h-44 bg-gray-700 rounded-lg mb-2">Image</div>
          <div className="text-lg truncate">Playlist Title</div>
        </div>
        {/* More playlists */}
      </div>
    </div>
  );
};

export default Playlists;

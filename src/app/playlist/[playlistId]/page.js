"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMusicPlayer } from "@/ContextApi/playContext";
import Footer from "@/Components/Footer/Footer";
import { useUser } from "@/ContextApi/userContext";

const PlaylistDetail = ({ params }) => {
  const { playlistId } = params;
  // const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    songs,
    setSongs,
    loadSong,
    currentSongIndex,
    playPause,
    isPlaying,
    showFooter,
  } = useMusicPlayer();
  const { isLoggedIn } = useUser();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          `/Api/user/getPlaylistSongs?playlistId=${playlistId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch playlist songs");
        }
        const data = await response.json();
        console.log(data.playlist);
        setPlaylist(data.playlist);
        setSongs(data.playlist.songs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSongs();
  }, [playlistId]);

  if (loading) return <div>Loading songs...</div>;
  if (error) return <div>Error: {error}</div>;

  const timeFormating = (sec) => {
    if (sec >= 3600) {
      const hours = Math.floor(sec / 3600);
      const remainingSec = Math.floor(sec % 3600);
      const mins = Math.floor(remainingSec / 60);
      const seconds = Math.floor(remainingSec % 60);
      const time = `${hours} hours ${mins} minutes ${seconds} seconds`;
      return time;
    }
    if (sec < 3600 && sec >= 60) {
      const mins = Math.floor(sec / 60);
      const seconds = Math.floor(sec % 60);
      const time = `${mins} minutes ${seconds} seconds`;
      console.log(time);
      console.log(mins);
      return time;
    } else {
      return sec;
    }
  };

  return (
    <div
      className={` m-1 bg-[linear-gradient(180deg,#535151_0%,#1a1b1f_91%)] rounded-[10px]  w-full `}
    >
      {songs.length === 0 ? (
        <div>No songs available for this playlist.</div>
      ) : (
        <div className="h-full">
          <div className="flex bg-[linear-gradient(to_right,#535151_0%,#1a1b1f_91%)] box-border gap-3 ss:gap-[30px] p-2.5 rounded-tr-[7px] rounded-tl-[7px] max-ss:max-h-[35%]">
            <img
              src={playlist.coverImg}
              className="w-auto h-[100px] ss:h-[165px] ss:ml-2.5 rounded-[5px]"
            />
            <div className="text-[medium] text-[white] flex flex-col">
              <span className="text-xl md:text-5xl font-extrabold">
                {playlist.title}
              </span>
              <span>
                <span className="">Artists:</span>
                <span>
                  {playlist.artists.map((artist) => {
                    return (
                      <span className="max-ss:text-sm">
                        {artist}
                        {", "}
                      </span>
                    );
                  })}
                </span>
              </span>
              <span>
                <span>
                  Total Songs:
                  <span className="max-ss:text-sm">
                    {playlist.songs.length}
                  </span>{" "}
                </span>
                {" , "}
                <span>
                  Duration:
                  <span className="max-ss:text-sm">
                    {timeFormating(playlist.duration)}
                  </span>{" "}
                </span>
              </span>
            </div>
          </div>
          <div className="flex w-full h-[50px] max-md:hidden text-[white] items-center sticky pl-[4%] top-0 bg-[linear-gradient(180deg,#7D7D7D_0%,#171718_91%)]">
            <div className="w-4/5 justify-between flex ml-5">
              <span className="gap-16 flex">
                <span className="index">#</span>
                <span className="title">Title</span>

                <span className="discription">Artists</span>
              </span>

              <span className="duration">duration</span>
              <span>Play/Pause</span>
            </div>
          </div>
          <div className="box-border ss:pl-5 p-2.5 overflow-y-scroll overflow-x-hidden ss:h-1/2 max-h-[68%]">
            <ul className="pr-1 h-full">
              {songs.map((song, index) => (
                <li
                  key={index}
                  className={`song-item ${
                    currentSongIndex === index ? "active" : ""
                  }`}
                >
                  <div className="flex bg-[rgb(16,14,14)] shadow-[2px_3px_5px_2px_rgba(0,0,0,1)] cursor-pointer text-[white] w-full ss:w-4/5 min-w-fit box-border items-center justify-between m-1 p-[2px] ss:p-[5px] ss:ml-5">
                    <div
                      className="flex justify-between w-[90%] items-center pr-[25%]"
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
                          className="h-7 ss:h-10 w-auto rounded-[5px] px-3"
                        />
                        <div
                          className="px-3 hover:underline max-ss:text-sm"
                          onClick={() =>
                            router.push(`/songs/${song._id}/${index}`)
                          }
                        >
                          {song.title} - {song.artists}
                        </div>
                      </div>
                      <div className="max-ss:text-sm">
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
                          {
                            isLoggedIn && playPause();
                          }
                        }
                      }}
                      className="z-50 "
                    >
                      {isPlaying ? (
                        <img className="h-5 ss:h-7 " src="/pause.png" />
                      ) : (
                        <img className="h-5 ss:h-7 " src="/play.png" />
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistDetail;

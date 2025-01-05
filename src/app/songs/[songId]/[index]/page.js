"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMusicPlayer } from "@/ContextApi/playContext";
import { useUser } from "@/ContextApi/userContext";

const SongDetail = ({ params }) => {
  const { songId, index } = params;
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
    const fetchSongDetails = async () => {
      try {
        const response = await fetch(
          `/Api/user/getSongDetails?songId=${songId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch song details");
        }
        const data = await response.json();
        setSong(data.song);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSongDetails();
  }, [songId]);

  if (loading) return <div>Loading song details...</div>;
  if (error) return <div></div>;
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
      className={`${
        showFooter ? "h-[78vh]" : "h-[89vh]"
      }  m-1 bg-[linear-gradient(180deg,#535151_0%,#1a1b1f_91%)] rounded-[10px]  w-full `}
    >
      {song.length === 0 ? (
        <div> song not available .</div>
      ) : (
        <div className="rounded-[10px] max-ss:max-h-[90%]">
          <div className="flex bg-[linear-gradient(to_right,#535151_0%,#1a1b1f_91%)] box-border gap-3 ss:gap-[30px] p-2.5 rounded-tl-[7px] rounded-tr-[7px] max-ss:max-h-[30%]">
            <img
              src={song.coverImg}
              className="w-auto h-[100px] md:h-[165px] ml-2.5 rounded-[5px]"
            />
            <div className="text-[medium] text-[white] flex flex-col">
              <span className="text-xl md:text-5xl font-extrabold">
                {song.title}
              </span>
              <span>
                <span>Artists:{song.artists}</span>
              </span>
              <span>
                {/* <span className="numSongs">
                  Total Songs: {playlist.songs.length}
                </span>
                {" , "} */}
                <span>Duration: {timeFormating(song.duration)}</span>
              </span>
            </div>
          </div>
          <div className="flex w-full h-[50px]  text-[white] items-center sticky pl-[4%] top-0 bg-[linear-gradient(180deg,#7D7D7D_0%,#171718_91%)] max-ss:hidden">
            <div className="w-4/5 justify-between flex ml-5">
              <span className="gap-16 flex">
                <span className="index">#</span>
                <span className="title">Title - Artists</span>

                <span className="discription"></span>
              </span>

              <span className="duration">duration</span>
              <span>Play/Pause</span>
            </div>
          </div>
          <div className=" box-border ss:pl-5 p-2.5 overflow-y-scroll overflow-x-hidden ss:h-1/2 max-h-[70%]">
            <ul className=" pr-1 h-full">
              <li
                key={index}
                className={`song-item ${
                  currentSongIndex === index ? "active" : ""
                }`}
              >
                <div className="flex bg-[rgb(16,14,14)] shadow-[2px_3px_5px_2px_rgba(0,0,0,1)] cursor-pointer text-[white] w-full ss:w-4/5 min-w-fit box-border items-center justify-between m-1 p-[5px] ss:ml-5">
                  <div
                    className="flex items-center "
                    onClick={() => loadSong(index)}
                  >
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
                    {`${
                      Math.floor(song.duration / 60) < 10 ? "0" : ""
                    }${Math.floor(song.duration / 60)}:${
                      Math.floor(song.duration % 60) < 10 ? "0" : ""
                    }${Math.floor(song.duration % 60)}`}
                  </div>
                  <div
                    onClick={() => {
                      {
                        isLoggedIn && playPause();
                      }
                    }}
                  >
                    {isPlaying ? (
                      <img className="h-7 " src="/pause.png" />
                    ) : (
                      <img className="h-7 " src="/play.png" />
                    )}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongDetail;

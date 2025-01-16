"use client";
import { useMusicPlayer } from "@/ContextApi/playContext";
import { useUser } from "@/ContextApi/userContext";
import React, { useState, useEffect } from "react";

const Footer = () => {
  const {
    isPlaying,
    playPause,
    nextSong,
    prevSong,
    toggleMute,
    changeVolume,
    changePlaybackSpeed,
    setPlaybackSpeed,
    playbackSpeed,
    isMuted,
    songs,
    currentSongIndex,
    loadSong,
    audioRef,
    showFooter,
  
    
  } = useMusicPlayer();

  const { isLoggedIn } = useUser();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [playbackVisible, setPlaybackVisible] = useState(false);

  // Update currentTime and duration from the audio element
  // const audioElement = audioRef.current;
  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      const handleTimeUpdate = () => {
        setCurrentTime(audioElement.currentTime);
      };

      const handleLoadedMetadata = () => {
        setDuration(audioElement.duration);
      };

      // Attach event listeners
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);

      // Cleanup listeners
      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, [audioRef, audioRef.current, loadSong]);
  // useEffect(() => {
  //   console.log(playblackSpeed);
  //   audioRef.current.playbackRate = playblackSpeed;
  // }, [playblackSpeed, audioRef]);

  // Handle seek bar changes
  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
    setCurrentTime(seekTime);
  };

  // Toggle loop mode
  const toggleLoop = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.loop = !audioElement.loop;
      setIsLooping(audioElement.loop);
    }
  };

  // Toggle shuffle mode
  const toggleShuffle = () => {
    setIsShuffling(!isShuffling);
  };

  // Play next song in shuffle mode
  const shuffleSong = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    loadSong(randomIndex);
  };

  // Play next song with shuffle consideration
  const handleNext = () => {
    if (isShuffling) {
      shuffleSong();
    } else {
      nextSong();
    }
  };

  // Format time into MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };
 


  return (
    <div
      className={`${
        showFooter ? "h-fit-content max-h-20" : "hidden h-0"
      } ${!isLoggedIn && showFooter? "opacity-50 pointer-events-none ":""} footer flex items-center justify-between bg-black z-50 w-full p-2 bottom-0`}

     
    >
      
      
     
    

      {/* Left Section */}
      <div className="flex items-center justify-start md:w-1/4">
        <div className=" flex items-center max-md:flex-col">
          <img
            src={showFooter ? songs[currentSongIndex].coverImg : null}
            className="w-10 ss:w-12 h-auto rounded"
            alt="song"
          />
          <div className="description ss:ml-2 text-white">
            <span className="block text-sm ss:font-medium truncate ">
              {showFooter ? songs[currentSongIndex].title : ""}
            </span>
            <span className="block text-sm truncate">
              {showFooter ? songs[currentSongIndex].artists : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="player flex flex-col justify-center  items-center md:w-1/2">
        <div className="controls-mid flex items-center justify-evenly gap-2 md:gap-5 mb-2 mt-2">
          <button onClick={toggleShuffle} className="bg-none border-none">
            <img
              src="/suffle.svg"
              alt="Shuffle"
              className={`w-5 h-5 ${
                isShuffling ? " opacity-100 " : " opacity-40 "
              }`}
            />
          </button>
          <button id="prev" className="bg-none border-none" onClick={prevSong}>
            <img src="/previous.svg" alt="Previous" className="w-5 h-5" />
          </button>
          <div
            id="playBtn"
            className="flex items-center justify-center w-10 h-10 bg-white rounded-full"
          >
            <button
              id="play_pause"
              className="bg-none border-none"
              onClick={playPause}
            >
              {isPlaying ? (
                <img src="/pause.svg" alt="Play/Pause" className="w-5 h-5" />
              ) : (
                <img
                  src="/play.svg"
                  alt="Play/Pause"
                  className="ml-[4px] w-5 h-5 "
                />
              )}
            </button>
          </div>
          <button onClick={handleNext} className="bg-none border-none">
            <img src="/agla.svg" className="w-5 h-5" />
          </button>
          <button onClick={toggleLoop} className="bg-none border-none">
            <img
              src="/loop.svg"
              alt="Loop"
              className={`fill-white w-5 h-5 ${
                isLooping ? " opacity-100 " : " opacity-40 "
              }`}
            />
          </button>
        </div>
        <div className="flex  items-center md:w-4/5">
          <span className="text-white min-w-[40px] text-center max-ss:text-sm">
            {showFooter ? formatTime(currentTime) : "00:00"}
          </span>
          <input
            type="range"
            className="flex-grow ss:mx-2 p-0 h-1 bg-gray-300 appearance-none rounded focus:outline-none"
            value={(currentTime / duration) * 100 || 0}
            max="100"
            onChange={handleSeek}
            style={{
              background: `linear-gradient(to right, #1db954 ${
                (currentTime / duration) * 100
              }%, #b3b3b3 ${(currentTime / duration) * 100}%)`,
            }}
          />

          <span id="total-time" className="text-white min-w-[40px] text-center">
            {showFooter ? formatTime(duration) : "00:00"}
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex max-md:flex-col items-center justify-end w-1/4">
        <div className="flex  items-center  max-md:justify-center  max-md:flex-col-reverse  max-md:mb-2">
          <div className="max-md:flex">
            <img
              src="/playback.png.png"
              className="max-ss:w-5"
              onClick={() => setPlaybackVisible(!playbackVisible)}
            />
            <h4 id="speed" className="text-white">
              {playbackSpeed}x
            </h4>
          </div>
          <ul
            className={`bg-black text-white border-2 max-md:flex border-solid border-gray-800 z-20 cursor-pointer ml-[3px] ss:mr-2  md:mb-2 ${
              playbackVisible ? "" : "opacity-0"
            }`}
          >
            <li
              id="2x"
              className={`${
                playbackSpeed === 2 ? "bg-blue-700" : ""
              }px-1 ss:px-2`}
              onClick={() => {
                changePlaybackSpeed(2);
                setPlaybackVisible(false);
              }}
            >
              2x
            </li>
            <li
              className={`${
                playbackSpeed === 1.5 ? "bg-blue-700" : ""
              } px-1 ss:px-2`}
              onClick={() => {
                changePlaybackSpeed(1.5);
                setPlaybackVisible(false);
              }}
            >
              1.5x
            </li>
            <li
              className={`${
                playbackSpeed === 1 ? "bg-blue-700" : ""
              } px-1 ss:px-2`}
              onClick={() => {
                changePlaybackSpeed(1);
                setPlaybackVisible(false);
              }}
            >
              1x
            </li>
            <li
              className={`${
                playbackSpeed === 0.5 ? "bg-blue-700" : ""
              } px-1 ss:px-2`}
              onClick={() => {
                changePlaybackSpeed(0.5);
                setPlaybackVisible(false);
              }}
            >
              0.5x
            </li>
          </ul>
        </div>

        {/* <div className=" m-2">
          <select
            onChange={(e) => {
              changePlaybackSpeed(parseFloat(e.target.value));
              console.log(changePlaybackSpeed(parseFloat(e.target.value)));
              console.log(playbackSpeed);
            }}
            value={playbackSpeed}
            className="bg-black text-white "
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div> */}
        <div className="flex items-center top-0">
          <button className=" bg-none border-none" onClick={toggleMute}>
            {isMuted ? (
              <img src="/no-volume.png" alt="Volume" className="ss:w-6 w-4 " />
            ) : (
              <img src="/volume.png" alt="Volume" className="ss:w-6 w-4 " />
            )}
            {/* <img src="/volume.svg" alt="Volume" className="w-6 h-6" /> */}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.000001"
            onChange={(e) => changeVolume(e.target.value)}
            value={audioRef.current ? audioRef.current.volume : 1}
            className="ml-2 h-1 w-[50px] ss:w-[100px] bg-gray-300 appearance-none rounded focus:outline-none"
            style={{
              background: `linear-gradient(to right, #1db954 ${
                audioRef.current ? (audioRef.current.volume / 1) * 100 : 1
              }%, #b3b3b3 ${
                audioRef.current ? (audioRef.current.volume / 1) * 100 : 1
              }%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;

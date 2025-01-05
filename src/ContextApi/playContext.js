"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // Normal speed
  const [isMuted, setIsMuted] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Declare audioRef without initializing Audio
  const audioRef = useRef(null);

  // Initialize Audio when the component is mounted
  useEffect(() => {
    if (typeof Audio !== "undefined") {
      audioRef.current = new Audio();
    }
  }, []);

  const loadSong = (songIndex) => {
    if (songs[songIndex] && audioRef.current) {
      audioRef.current.src = songs[songIndex].link;
      audioRef.current.load();
      // audioRef.current.play();
      setShowFooter(true);
      setCurrentSongIndex(songIndex);
      // setIsPlaying(true);
    }
  };

  const playPause = () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
    } else if (audioRef.current) {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    loadSong(nextIndex);
  };

  const prevSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    loadSong(prevIndex);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const changeVolume = (volume) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };

  const changePlaybackSpeed = (speed) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
    setPlaybackSpeed(speed);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        isPlaying,
        playPause,
        nextSong,
        prevSong,
        toggleMute,
        changeVolume,
        changePlaybackSpeed,
        playbackSpeed,
        isMuted,
        songs,
        setSongs,
        currentSongIndex,
        setCurrentSongIndex,
        showFooter,
        loadSong,
        audioRef,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  return useContext(MusicPlayerContext);
};

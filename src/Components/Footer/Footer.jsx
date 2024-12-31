// components/Footer.js
"use client";
import { useState } from "react";

const Footer = () => {
  const [volume, setVolume] = useState(100);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  return (
    <div className="bg-[rgba(240,255,255,0.174)]">
      <div className="footer flex justify-between items-center p-4 space-x-4">
        {/* Controls Left */}
        <div className="flex items-center space-x-3">
          <img src="songImg.png" className="w-12 h-12 rounded-lg" alt="song" />
          <div className="text-white">Song Name Artist</div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex space-x-2">
            <button
              id="shuffle"
              className="p-2 hover:scale-110 transition-transform"
            >
              <img src="suffle.svg" alt="shuffle" className="w-5 h-5" />
            </button>
            <button
              id="prev"
              className="p-2 hover:scale-110 transition-transform"
            >
              <img src="previous.svg" alt="previous" className="w-5 h-5" />
            </button>
            <button
              id="play_pause"
              className="p-2 hover:scale-110 transition-transform"
            >
              <img src="play.svg" alt="Play/Pause" className="w-5 h-5" />
            </button>
            <button
              id="next"
              className="p-2 hover:scale-110 transition-transform"
            >
              <img src="next.svg" alt="next" className="w-5 h-5" />
            </button>
            <button
              id="loop"
              className="p-2 hover:scale-110 transition-transform"
            >
              <img src="logo.svg" alt="loop" className="w-5 h-5" />
            </button>
          </div>

          {/* Seekbar */}
          <div className="flex items-center space-x-4">
            <span className="text-white">00:00</span>
            <input
              type="range"
              value="0"
              max="100"
              className="w-64"
              id="seekbar"
            />
            <span className="text-white">00:00</span>
          </div>
        </div>

        {/* Controls Right */}
        <div className="flex items-center space-x-4">
          <img
            src="playback.png.png"
            className="w-6 h-6"
            id="playback_img"
            alt="playback"
          />
          <div className="text-white">{playbackSpeed}x</div>
          <button
            id="vol"
            className="p-2"
            onClick={() => setVolume(volume === 0 ? 100 : 0)}
          >
            <img
              src="fullVol.png"
              alt="Volume"
              className="w-6 h-6"
              id="vol-img"
            />
          </button>
          <input
            type="range"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            max="100"
            id="seekbar-vol"
            className="w-24"
          />
        </div>
      </div>

      {/* Playback Speed Options */}
      <ul
        id="playback_option"
        className="bg-white text-black p-2 list-none flex justify-around space-x-2"
      >
        <li onClick={() => setPlaybackSpeed(2)}>2x</li>
        <li onClick={() => setPlaybackSpeed(1.5)}>1.5x</li>
        <li onClick={() => setPlaybackSpeed(1)}>1x</li>
        <li onClick={() => setPlaybackSpeed(0.5)}>.5x</li>
      </ul>
    </div>
  );
};

export default Footer;

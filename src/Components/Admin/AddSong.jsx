"use client";

import React, { useState } from "react";

const AddSong = () => {
  const [title, setTitle] = useState("");
  const [artists, setArtists] = useState("");
  const [coverImg, setCoverImg] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const handleSongUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artists", artists);
    formData.append("coverImg", coverImg);
    formData.append("audioFile", audioFile);

    const res = await fetch("/Api/admin/uploadSong", {
      method: "POST",

      body: formData,
    });

    const data = await res.json();

    if (data.error) {
      alert("Error: " + data.error);
    } else {
      alert("Song uploaded successfully");
    }
  };

  return (
    <div className="p-5 bg-gray-800">
      <form encType="multipart/form-data" onSubmit={handleSongUpload}>
        <input
          type="text"
          placeholder="Song Title"
          value={title}
          className="text-black"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artists (comma separated)"
          value={artists}
          className="text-black"
          onChange={(e) => setArtists(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImg(e.target.files[0])}
        />
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files[0])}
        />
        <button type="submit">Upload Song</button>
      </form>
    </div>
  );
};

export default AddSong;

import mongoose from "mongoose";

// Define the Artist Schema
const artistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    coverImg: {
      type: String,
      required: true,
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Song document
        ref: "Song", // Refers to the Song model
        required: true,
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Artist model
export const Artist = mongoose.model("Artist", artistSchema);

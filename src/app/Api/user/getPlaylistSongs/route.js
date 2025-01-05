import { NextResponse } from "next/server";

import dbConnect from "@/Utilities/db";
import { Playlist } from "@/Models/playlist.model";
import Song from "@/Models/song.model";

export async function GET(req) {
  try {
    // Parse playlistId from query parameters
    const { searchParams } = new URL(req.url);
    const playlistId = searchParams.get("playlistId");

    if (!playlistId) {
      console.log("not getting");
      return NextResponse.json(
        { error: "Playlist ID is required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Find the playlist by ID
    const playlist = await Playlist.findById(playlistId).populate("songs");

    if (!playlist) {
      return NextResponse.json(
        { error: "Playlist not found" },
        { status: 404 }
      );
    }

    // Return the songs
    return NextResponse.json({ playlist: playlist }, { status: 200 });
  } catch (error) {
    console.error("Error fetching playlist songs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import dbConnect from "@/Utilities/db";

import Song from "@/Models/song.model";
import { myPlaylist } from "@/Models/myPlaylist.model";
import { verifyJWT } from "@/Utilities/jwt";

export const GET = async (req) => {
  try {
    await dbConnect();
    let user;
    try {
      console.log("Verifying JWT...");
      const userDetails = await verifyJWT(req);
      user = userDetails.userId;
      console.log("Verified user:", user);
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 401,
      });
    }

    console.log("Fetching playlists for user:", user);
    const playlists = await myPlaylist.find({ user }).populate("songs");

    return NextResponse.json({ playlists }, { status: 200 });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

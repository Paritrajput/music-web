"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Mylibrary = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4  p-1 max-ml:hidden">
      {/* Library Section */}
      <div className="flex flex-col bg-[#0f0f0f] rounded-lg h-full ">
        <div className="flex items-center justify-between bg-[#101010] p-4 rounded-t-lg text-gray-400 text-lg font-medium ">
          <div className="flex items-center gap-4">
            <svg
              role="img"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="white"
              className="h-[25px]"
            >
              <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
            </svg>
            <span>Your Library</span>
          </div>
          <span
            className="hover:text-white cursor-pointer"
            onClick={() => {
              router.push("/CreatePlaylist");
            }}
          >
            +
          </span>
        </div>

        <div className="flex flex-col gap-4 bg-[#171717] p-4 overflow-auto font-medium text-white">
          {/* Playlist Section */}
          <div className="bg-[#2e2d2e] rounded-lg p-4 flex flex-col items-center justify-evenly">
            <div>Create your first playlist</div>
            <div>It’s easy, we’ll help you</div>
            <Link
              href="/CreatePlaylist"
              className="mt-4 px-6 py-2 bg-white text-black rounded-full text-lg font-medium"
            >
              Create Playlist
            </Link>
          </div>

          {/* Podcast Section */}
          <div className="bg-[#2e2d2e] rounded-lg p-4 flex flex-col items-center justify-evenly">
            <div>Let’s find some podcasts to follow</div>
            <div>We’ll keep you updated on new episodes</div>
            <Link
              href="/search"
              className="mt-4 px-6 py-2 bg-white text-black rounded-full text-lg font-medium"
            >
              Browse Podcasts
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 bg-[#101010] p-4 text-gray-300">
          <Link href="/" className="hover:underline text-white">
            Cookie
          </Link>
          <button className="flex items-center gap-2 justify-center px-4 py-2 border border-white rounded-full">
            <Image
              src="/download-removebg-preview (8).png"
              alt="Language Icon"
              width={30}
              height={30}
            />
            <span>English</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mylibrary;

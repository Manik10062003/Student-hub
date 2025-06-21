"use client";
import { useState } from "react";

export default function FollowersInfo({ slug, joined: initialJoined, followers: initialFollowers, email }) {
  const [joined, setJoined] = useState(initialJoined);
  const [followers, setFollowers] = useState(initialFollowers);

  async function handleJoin() {
    const res = await fetch(`/api/community/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      setJoined(true);
      setFollowers(followers + 1);
    }
  }

  return (
    <div className="flex items-center gap-4 mb-4">
      <span className="text-gray-700">{followers} followers</span>
      {!joined && (
        <button
          onClick={handleJoin}
          className="bg-yellow-400 text-[#001F3F] px-3 py-1 rounded hover:bg-yellow-500"
        >
          Join
        </button>
      )}
    </div>
  );
}

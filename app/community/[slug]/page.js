"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ChatBox from "@/components/ChatBox";  // Assuming or creating this later

export default function CommunityPage({ params }) {
  const { slug } = params;
  const { data: session, status } = useSession();
  const router = useRouter();
  const [joined, setJoined] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;  // Don't run until session is loaded

    if (!session) {
      router.push("/signin");
      return;
    }

    const fetchCommunityData = async () => {
      try {
        const res = await fetch(`/api/community/${slug}?email=${session.user.email}`);
        if (res.ok) {
          const data = await res.json();
          setJoined(data.joined);
          setFollowers(data.followers);
        } else {
          console.error("Failed to fetch community data");
        }
      } catch (err) {
        console.error("Error fetching community data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityData();
  }, [session, slug, router, status]);

  const handleJoin = async () => {
    try {
      const res = await fetch(`/api/community/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email }),
      });
      if (res.ok) {
        setJoined(true);
        setFollowers((prev) => prev + 1);
      } else {
        console.error("Failed to join community");
      }
    } catch (err) {
      console.error("Error joining community", err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-6 px-4 text-center">
        <p className="text-gray-500">Loading community...</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-1 capitalize">{slug} Community</h1>
      <p className="text-gray-500 mb-4">{followers} followers</p>

      {!joined ? (
        <Button
          onClick={handleJoin}
          className="bg-yellow-400 text-[#001F3F] hover:bg-yellow-500 mb-4"
        >
          Join Community
        </Button>
      ) : (
        <>
          <p className="text-green-600 font-medium mb-4">
            You have joined this community!
          </p>
          <ChatBox slug={slug} email={session.user.email} />
        </>
      )}
    </div>
  );
}

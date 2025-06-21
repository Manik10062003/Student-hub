"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const communities = [
    { slug: "cse", name: "CSE Community" },
    { slug: "ece", name: "ECE Community" },
    { slug: "mech", name: "Mechanical Community" },
    { slug: "civil", name: "Civil Community" },
    { slug: "ice", name: "ICE Community" },
    { slug: "chemical", name: "Chemical Community" },
    { slug: "biotech", name: "Biotech Community" },
    { slug: "electrical", name: "Electrical Community" },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#001F3F] text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-bold text-yellow-400">
          Konnect
        </Link>
        {session ? (
          <div className="flex items-center gap-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Stop event bubbling
                  setShowDropdown((prev) => !prev);
                }}
                className="cursor-pointer"
              >
                Communities
              </button>
              {showDropdown && (
                <div className="absolute bg-white text-black rounded shadow-lg mt-2 w-48 z-50">
                  {communities.map((comm) => (
                    <Link
                      key={comm.slug}
                      href={`/community/${comm.slug}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      {comm.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/internships" className="hover:text-yellow-400">
              Internships
            </Link>
            <Link href="/resources" className="hover:text-yellow-400">
              Resources
            </Link>
            <Link href="/hackathons" className="hover:text-yellow-400">
              Hackathons
            </Link>
            <Button
              variant="outline"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-[#001F3F]"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/signin" className="hover:text-yellow-400">
              Sign In
            </Link>
            <Button
              className="bg-yellow-400 text-[#001F3F] hover:bg-yellow-500"
              onClick={() => router.push("/signup")}
            >
              GET STARTED
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

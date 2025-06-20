import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="bg-[#001F3F] text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-bold text-yellow-400">
          Konnect
        </Link>
        {session ? (
          <div className="flex items-center gap-4">
            <div className="relative group">
              <span className="cursor-pointer">Communities</span>
              <div className="absolute hidden group-hover:block bg-white text-black rounded shadow-lg mt-2">
                <Link href="/community/cse" className="block px-4 py-2 hover:bg-gray-100">CSE</Link>
                <Link href="/community/ece" className="block px-4 py-2 hover:bg-gray-100">ECE</Link>
                <Link href="/community/mech" className="block px-4 py-2 hover:bg-gray-100">Mech</Link>
                {/* Add more branches here */}
              </div>
            </div>
            <Link href="/internships">Internships</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/hackathons">Hackathons</Link>
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
            <Link href="/signin">Sign In</Link>
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

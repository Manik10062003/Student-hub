'use client'; 

import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
    const { data: session, status } = useSession();

  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between items-center">
      <div className="text-xl font-bold">Student Hub</div>

      <div>
        {status === 'loading' && (
          <span>Loading...</span>
        )}

        {status === 'authenticated' && (
          <div className="flex items-center gap-2">
            {session.user.image && (
              <img 
                src={session.user.image} 
                alt="profile" 
                className="w-8 h-8 rounded-full"
              />
            )}
            <span>{session.user.name}</span>
            <button 
              onClick={() => signOut()} 
              className="ml-2 bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
            >
              Logout
            </button>
          </div>
        )}

        {status === 'unauthenticated' && (
          <button 
            onClick={() => signIn()} 
            className="bg-green-500 hover:bg-green-600 px-2 py-1 rounded"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  )
}

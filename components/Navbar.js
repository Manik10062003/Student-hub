import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-600 text-white p-4 flex justify-between">
      <div className="font-bold text-lg">Student Hub</div>
      <div className="space-x-4">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/branches" className="hover:underline">Branches</Link>
        <Link href="/login" className="hover:underline">Login</Link>
      </div>
    </nav>
  );
}

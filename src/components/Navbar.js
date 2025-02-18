import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="font-bold text-xl">SEG Forum</h1>
        <div className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/signup">Signup/Login</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/discussions">Discussions</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/chat">Live Chat</Link>
        </div>
      </div>
    </nav>
  );
}

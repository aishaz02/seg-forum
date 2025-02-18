import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Welcome to SEG Forum</h1>
        <p className="text-lg">Connect, share, and grow with our community.</p>
      </main>
    </div>
  );
}

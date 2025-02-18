"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Signup / Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input type="email" placeholder="Email" className="border p-2 mb-2" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="border p-2 mb-2" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="space-x-4">
        <button onClick={handleSignUp} className="bg-blue-600 text-white p-2 rounded">Sign Up</button>
        <button onClick={handleLogin} className="bg-green-600 text-white p-2 rounded">Log In</button>
      </div>
    </div>
  );
}

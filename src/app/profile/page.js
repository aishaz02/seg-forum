"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ name: "", expertise: "", interests: "" });
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        loadProfile(user.uid);
      } else {
        router.push("/signup");
      }
    });
    return unsubscribe;
  }, []);

  const loadProfile = async (uid) => {
    const docRef = doc(db, "profiles", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProfile(docSnap.data());
    }
  };

  const handleSave = async () => {
    if (user) {
      await setDoc(doc(db, "profiles", user.uid), profile);
      alert("Profile saved!");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <input type="text" placeholder="Name" className="border p-2 mb-2" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
      <input type="text" placeholder="Expertise" className="border p-2 mb-2" value={profile.expertise} onChange={(e) => setProfile({ ...profile, expertise: e.target.value })} />
      <input type="text" placeholder="Interests" className="border p-2 mb-2" value={profile.interests} onChange={(e) => setProfile({ ...profile, interests: e.target.value })} />
      <button onClick={handleSave} className="bg-blue-600 text-white p-2 rounded">Save Profile</button>
    </div>
  );
}

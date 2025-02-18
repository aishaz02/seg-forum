"use client";
import { useState, useEffect } from "react";
import { db } from "../../../lib/firebase";  // ✅ CORRECT - Uses relative path
import { collection, query, onSnapshot } from "firebase/firestore";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const resourcesRef = collection(db, "resources");

  useEffect(() => {
    const q = query(resourcesRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setResources(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Resource Hub</h1>
      <div className="space-y-4">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{resource.title}</h2>
            <p>{resource.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

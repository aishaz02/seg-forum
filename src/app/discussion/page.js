"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

export default function Discussions() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const postsRef = collection(db, "posts");

  // Listen for new posts in real time
  useEffect(() => {
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    });
    return () => unsubscribe();
  }, []);

  const handlePost = async () => {
    if (newPost.trim() !== "") {
      await addDoc(postsRef, {
        content: newPost,
        createdAt: serverTimestamp(), // Firestore timestamp
      });
      setNewPost("");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Discussion Forum</h1>
      <div className="mb-4">
        <textarea
          className="border p-2 w-full"
          placeholder="Share your thoughts..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button onClick={handlePost} className="bg-blue-600 text-white p-2 mt-2 rounded">
          Post
        </button>
      </div>
      <div>
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow mb-4">
            <p>{post.content}</p>
            <small>{post.createdAt?.seconds ? new Date(post.createdAt.seconds * 1000).toLocaleString() : "Just now"}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

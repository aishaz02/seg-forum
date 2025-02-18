"use client";
import { useState, useEffect } from "react";
import { db } from "../../../lib/firebase";  // ✅ CORRECT - Uses relative path
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "chatMessages");

  useEffect(() => {
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
      });
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Live Chat</h1>
      <div className="bg-white p-4 rounded shadow h-96 overflow-y-scroll mb-4">
        {messages.map((msg) => (
          <p key={msg.id} className="mb-2">{msg.text}</p>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Type your message..."
          className="border p-2 flex-grow"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage} className="bg-blue-600 text-white p-2 ml-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}

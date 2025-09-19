"use client";
import { useState } from "react";
import axios from "axios";
import api from "@/utils/db";

export default function Home() {
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hi! How can I help you today?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/chat", { message: input }); // Connects to your backend
      const botMessage = { sender: "bot", text: res.data.reply || "No response" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error: Failed to connect." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-3xl font-bold mb-4">🤖 Chatbot</h1>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-4 flex flex-col space-y-4">
        <div className="flex-1 overflow-y-auto max-h-80 border rounded-lg p-2 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 p-2 rounded-xl max-w-[75%] ${
                msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <p className="text-gray-500 text-sm">Bot is typing...</p>}
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

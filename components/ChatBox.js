"use client";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

let socket;

export default function ChatBox({ slug, email }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001");

    socket.emit("joinRoom", { room: slug, email });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    

    return () => {
      socket.disconnect();
    };
  }, [slug, email]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("chatMessage", { room: slug, email, text: input });
      setInput("");
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow max-h-[500px] flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2 mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-2 rounded ${msg.email === email ? "bg-yellow-100 text-right" : "bg-gray-100 text-left"}`}>
            <small className="block text-xs text-gray-500">{msg.email}</small>
            <span>{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-yellow-400 text-[#001F3F] px-4 rounded hover:bg-yellow-500"
        >
          Send
        </button>
      </div>
    </div>
  );
}

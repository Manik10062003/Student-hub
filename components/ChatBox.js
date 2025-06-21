"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getSocket } from "@/lib/socket";
import Filter from "bad-words";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socket = getSocket();
  const filter = new Filter();

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("message");
  }, [socket]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const cleanMsg = filter.clean(input);
    socket.emit("message", cleanMsg);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-white rounded shadow p-4">
      <div className="flex-1 overflow-y-auto space-y-2 mb-2">
        {messages.map((m, i) => (
          <div key={i} className="bg-gray-100 rounded p-2">
            {m}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}

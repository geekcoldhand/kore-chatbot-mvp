"use client";
import React from "react";
import { useState } from "react";
import MicButton from "./MicButton";

interface Message {
  text: string;
  response: any;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const sendMessage = async () => {
    const res = await fetch("/api/kore", {
      method: "POST",
      body: JSON.stringify({ text: input }),
    });
    const data = await res.json();
    setMessages([...messages, { text: input, response: data }]);
    setInput("");
  };

  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i}>
          <p><strong>You:</strong> {msg.text}</p>
          <p><strong>Bot:</strong> {msg.response?.message}</p>
        </div>
      ))}
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <MicButton onTranscribe={(t) => setInput(t)} />
    </div>
  );
}
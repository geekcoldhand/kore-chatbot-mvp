import ChatBox from "../../components/ChatBox";
import React from "react";

export default function ChatPage() {
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Kore.ai Chatbot MVP</h1>
      <ChatBox />
    </main>
  );
}
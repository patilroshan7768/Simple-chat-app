import React, { useEffect, useRef } from "react";
import Message from "./Message.jsx";

export default function ChatWindow({ messages, currentUser }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-white rounded h-full shadow p-4 flex flex-col">
      <div className="flex-1 overflow-auto mb-4">
        {messages.map((m, i) => (
          <Message key={i} message={m} isOwn={m.author === currentUser} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

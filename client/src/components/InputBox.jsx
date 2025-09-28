import React, { useState } from "react";

export default function InputBox({ onSend }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="flex">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        className="flex-1 p-2 border rounded-l"
        placeholder="Type a message..."
      />
      <button onClick={send} className="px-4 bg-blue-600 text-white rounded-r">
        Send
      </button>
    </div>
  );
}

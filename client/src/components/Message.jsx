import React from "react";

export default function Message({ message, isOwn }) {
  if (message.system) {
    return <div className="text-center text-sm text-gray-500 my-2">{message.content}</div>;
  }

  return (
    <div className={`flex mb-2 ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className={`${isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"} rounded-xl px-3 py-2 max-w-xs break-words`}>
        {!isOwn && <div className="text-xs font-semibold mb-1">{message.author}</div>}
        <div>{message.content}</div>
        <div className="text-xs text-right mt-1 opacity-70">{new Date(message.timestamp).toLocaleTimeString()}</div>
      </div>
    </div>
  );
}

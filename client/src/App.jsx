import React, { useEffect, useState } from "react";
import socket from "./socket";
import ChatWindow from "./components/ChatWindow.jsx";
import InputBox from "./components/InputBox.jsx";

function App() {
  const [username, setUsername] = useState("");
  const [tempName, setTempName] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("user_joined", ({ username }) => {
      setMessages((prev) => [...prev, { system: true, content: `${username} joined.` }]);
    });

    socket.on("user_left", ({ username }) => {
      setMessages((prev) => [...prev, { system: true, content: `${username} left.` }]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("user_joined");
      socket.off("user_left");
    };
  }, []);

  useEffect(() => {
    if (!username) return;
    socket.auth = { username };
    socket.connect();
    socket.emit("join", username);

    return () => {
      if (socket.connected) socket.disconnect();
    };
  }, [username]);

  const handleSend = (text) => {
    if (!text) return;
    const message = {
      author: username,
      content: text,
      timestamp: new Date().toISOString(),
    };
    socket.emit("send_message", message);
    //setMessages((prev) => [...prev, message]);
  };

  if (!username) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow w-full max-w-md">
          <h1 className="text-xl font-semibold mb-4">Enter your name</h1>
          <input
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="Your name"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            className="w-full py-2 bg-blue-600 text-white rounded"
            onClick={() => tempName.trim() && setUsername(tempName.trim())}
          >
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-600 text-white p-4">
        <div className="max-w-4xl mx-auto">Logged in as <strong>{username}</strong></div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-4">
        <ChatWindow messages={messages} currentUser={username} />
      </main>

      <footer className="p-4 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <InputBox onSend={handleSend} />
        </div>
      </footer>
    </div>
  );
}

export default App;

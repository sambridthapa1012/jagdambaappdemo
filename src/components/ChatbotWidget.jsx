import React, { useState } from "react";
import { Bot, X, Send } from "lucide-react";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

const handleSend = async () => {
  if (!input.trim()) return;

  const userText = input;


  setMessages((prev) => [...prev, { sender: "user", text: userText }]);
  setInput("");
  setTyping(true);
 

  try {
        {typing && (
  <div className="flex items-center gap-1 text-gray-500 text-sm">
    <span className="animate-bounce">•</span>
    <span className="animate-bounce delay-150">•</span>
    <span className="animate-bounce delay-300">•</span>
  </div>
)}
    const res = await fetch("http://localhost:5000/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    });

    const data = await res.json();



    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: data.reply || "Sorry, I couldn’t find that." },
    ]);
  } catch (err) {
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "AI is currently unavailable." },
    ]);
  } finally {
    setTyping(false);
  }
};



  return (
    <>
      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-5 w-80 bg-white shadow-2xl rounded-xl z-50 overflow-hidden">
          <div className="bg-orange-600 text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">AI Assistant</span>
            </div>
            <button onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-64 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-orange-600 text-white ml-auto"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-2 flex gap-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border rounded-lg px-2 py-1 text-sm focus:outline-none"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSend}
              className="bg-orange-600 text-white p-2 rounded-lg"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Chatbot Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-20 z-50 w-14 h-14 rounded-full bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        aria-label="Open AI Chatbot"
      >
        <Bot className="w-7 h-7" />
      </button>
    </>
  );
};

export default ChatbotWidget;

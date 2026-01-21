import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const WhatsAppChat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // 🔴 OWNER WHATSAPP NUMBER (country code required)
  const OWNER_NUMBER = "9779814361932"; // Nepal example

  const handleSend = () => {
    if (!message.trim()) return;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${OWNER_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
    setMessage("");
    setOpen(false);
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-3.5  bg-green-700 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition z-50"
      >
        <MessageCircle size={28} />
      </button>

      {/* Popup */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-2xl z-50 animate-slide-up">
          
          {/* Header */}
          <div className="bg-green-700 text-white px-3 py-3 rounded-t-xl flex justify-between items-center">
            <div>
              <p className="font-semibold">Chat with us</p>
              <p className="text-xs opacity-90">Typically replies instantly</p>
            </div>
            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          {/* Body */}
          <div className="p-4">
            <textarea
              rows="9"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
            />

            <button
              onClick={handleSend}
              className="mt-3 w-full bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition"
            >
              <Send size={18} />
              Send via WhatsApp
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppChat;

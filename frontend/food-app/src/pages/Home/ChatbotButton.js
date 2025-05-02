import React, { useState } from "react";



















const ChatbotButton = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      const botMessage = { type: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Error reaching server." }
      ]);
    }

    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "tomato",
          color: "white",
          fontSize: 30,
          border: "none",
          cursor: "pointer",
          zIndex: 1000
        }}
      >
        💬
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 300,
            maxHeight: 400,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: 10,
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000
          }}
        >
          <div
            style={{
              padding: 10,
              flexGrow: 1,
              overflowY: "auto",
              maxHeight: 300
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.type === "user" ? "right" : "left",
                  color: msg.type === "user" ? "#333" : "green",
                  marginBottom: 5
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about food..."
              style={{
                flexGrow: 1,
                padding: 10,
                border: "none",
                outline: "none"
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                backgroundColor: "tomato",
                color: "white",
                border: "none",
                padding: "10px 15px",
                cursor: "pointer"
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotButton;

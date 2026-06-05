import { useState, useRef, useEffect } from "react"
import Navbar from "../components/Navbar"

const Workspace = () => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [chatHistory, setChatHistory] = useState([])

  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }, [messages])

  const handleNewChat = () => {
    setMessages([])
  }

  const sendMessage = () => {
    if (message.trim() === "") return

    const userMessage = {
      text: message,
      sender: "user"
    }

    if (!chatHistory.includes(message)) {
      setChatHistory((prev) => [message, ...prev])
    }

    setMessages((prev) => [...prev, userMessage])

    setMessage("")

    setTimeout(() => {
      const aiMessage = {
        text: "AI connected successfully 🚀",
        sender: "ai"
      }

      setMessages((prev) => [...prev, aiMessage])
    }, 800)
  }

  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">

        {/* Sidebar */}
        <div className="hidden md:block w-[260px] border-r border-white/10 bg-white/5 p-4">

          <button
            onClick={handleNewChat}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold"
          >
            + New Chat
          </button>

          <div className="mt-6 space-y-2">

            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-sm truncate"
              >
                {chat}
              </div>
            ))}

          </div>

        </div>

        {/* Chat Area */}
        <div className="flex-1 p-3 md:p-6 mt-4">

          <div className="w-full">

            {/* Messages */}
            <div className="h-[75vh] md:h-[500px] bg-white/5 border border-white/10 rounded-3xl mb-6 p-6 overflow-y-auto flex flex-col gap-4">

              {messages.length === 0 ? (
                <p className="text-gray-400">
                  Welcome to AIVIO AI 🚀
                </p>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`px-5 py-3 rounded-2xl max-w-[80%] ${
                      msg.sender === "user"
                        ? "self-end bg-gradient-to-r from-cyan-500 to-purple-600"
                        : "self-start bg-white/10 border border-white/10"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))
              )}

              <div ref={messagesEndRef}></div>

            </div>

            {/* Input */}
            <div className="flex w-full gap-2 sticky bottom-0 bg-black/40 backdrop-blur-xl p-2 rounded-3xl">

              <input
                type="text"
                placeholder="Message AIVIO AI..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage()
                  }
                }}
                className="flex-1 w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none text-white"
              />

              <button
                onClick={sendMessage}
                className="px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold"
              >
                Send
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default Workspace

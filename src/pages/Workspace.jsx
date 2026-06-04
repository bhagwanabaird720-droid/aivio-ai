import { useState } from "react"
import Navbar from "../components/Navbar"

const Workspace = () => {

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  const sendMessage = () => {

    if (message.trim() === "") return

    setMessages([
      ...messages,
      {
        text: message,
        sender: "user"
      }
    ])

    setMessage("")
  }

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen bg-black text-white">

        {/* Sidebar */}
        <div className="w-[260px] border-r border-white/10 bg-white/5 p-4">

          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold">
            + New Chat
          </button>

        </div>

        {/* Chat Area */}
        <div className="flex-1 flex items-center justify-center p-6">

          <div className="w-full max-w-3xl">

            {/* Messages */}
            <div className="h-[500px] bg-white/5 border border-white/10 rounded-3xl mb-6 p-6 overflow-y-auto flex flex-col gap-4">

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
                        : "self-start bg-white/10"
                    }`}
                  >
                    {msg.text}
                  </div>

                ))

              )}

            </div>

            {/* Input */}
            <div className="flex gap-4 sticky bottom-0 bg-black/40 backdrop-blur-xl p-2 rounded-3xl">

              <input
                type="text"
                placeholder="Message AIVIO AI..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white"
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

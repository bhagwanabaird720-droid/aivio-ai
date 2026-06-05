import { useState, useRef, useEffect } from "react"
import Navbar from "../components/Navbar"

const Workspace = () => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [chats, setChats] = useState([])
  const [showMenu, setShowMenu] = useState(false)
  const [activeChatId, setActiveChatId] = useState(null)

  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    })
  }, [messages])

  const handleNewChat = () => {
    setMessages([])
    setActiveChatId(null)
    setShowMenu(false)
  }

  const openChat = (chat) => {
    setMessages(chat.messages)
    setActiveChatId(chat.id)
    setShowMenu(false)
  }

  const sendMessage = () => {
    if (!message.trim()) return

    const userMessage = {
      text: message,
      sender: "user",
    }

    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)

    if (activeChatId === null) {
      const newChat = {
        id: Date.now(),
        title: message,
        messages: updatedMessages,
      }

      setChats((prev) => [newChat, ...prev])
      setActiveChatId(newChat.id)
    } else {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                messages: updatedMessages,
              }
            : chat
        )
      )
    }

    setMessage("")

    setTimeout(() => {
      const aiMessage = {
        text: "AI connected successfully 🚀",
        sender: "ai",
      }

      const finalMessages = [...updatedMessages, aiMessage]

      setMessages(finalMessages)

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                messages: finalMessages,
              }
            : chat
        )
      )
    }, 800)
  }

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen bg-black text-white pt-20">

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-[250px] border-r border-white/10 bg-white/5 p-4">

          <button
            onClick={handleNewChat}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold"
          >
            + New Chat
          </button>

          <div className="mt-6 space-y-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => openChat(chat)}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-sm truncate cursor-pointer hover:bg-white/10"
              >
                {chat.title}
              </div>
            ))}
          </div>

        </div>

        {/* Main Area */}
        <div className="flex-1 p-3 md:p-6">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden mb-3 px-4 py-2 rounded-xl bg-white/10"
          >
            ☰ Chats
          </button>

          {/* Mobile Chat List */}
          {showMenu && (
            <div className="md:hidden mb-4 p-3 rounded-2xl bg-white/5 border border-white/10">

              <button
                onClick={handleNewChat}
                className="w-full mb-3 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600"
              >
                + New Chat
              </button>

              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => openChat(chat)}
                  className="p-3 mb-2 rounded-xl bg-white/5 border border-white/10 text-sm cursor-pointer"
                >
                  {chat.title}
                </div>
              ))}
            </div>
          )}

          {/* Messages */}
          <div className="h-[70vh] bg-white/5 border border-white/10 rounded-3xl p-6 overflow-y-auto flex flex-col gap-4">

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

            <div ref={messagesEndRef} />

          </div>

          {/* Input */}
          <div className="mt-4 flex gap-2 bg-black/40 backdrop-blur-xl p-2 rounded-3xl">

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
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none text-white"
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
    </>
  )
}

export default Workspace

import { useState, useRef, useEffect } from "react"
import Navbar from "../components/Navbar"

const Workspace = () => {
const [message, setMessage] = useState("")
const [messages, setMessages] = useState([])

const [chats, setChats] = useState(() => {
  const savedChats = localStorage.getItem("aivio-chats")
  return savedChats ? JSON.parse(savedChats) : []
})

const [showMenu, setShowMenu] = useState(false)

const [activeChatId, setActiveChatId] = useState(() => {
  const savedId = localStorage.getItem("aivio-active-chat")
  return savedId ? JSON.parse(savedId) : null
})
  
const chatContainerRef = useRef(null)
const textareaRef = useRef(null)

const [viewportHeight, setViewportHeight] = useState(window.innerHeight)

useEffect(() => {
  const handleResize = () => {
    setViewportHeight(window.innerHeight)
  }

  window.addEventListener("resize", handleResize)

  return () =>
    window.removeEventListener("resize", handleResize)
}, [])

useEffect(() => {
  setTimeout(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, 100)
}, [messages])

useEffect(() => {
  localStorage.setItem(
    "aivio-chats",
    JSON.stringify(chats)
  )
}, [chats])

useEffect(() => {
  localStorage.setItem(
    "aivio-active-chat",
    JSON.stringify(activeChatId)
  )
}, [activeChatId])

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
  const deleteChat = (chatId) => {
  setChats((prev) =>
    prev.filter((chat) => chat.id !== chatId)
  )

  if (activeChatId === chatId) {
    setMessages([])
    setActiveChatId(null)
  }
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
  textareaRef.current?.focus()
}, 50)

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
      {/* <Navbar /> */}

      <div className="flex h-[100dvh] bg-black text-white overflow-hidden">

        {/* Desktop Sidebar */}
<div className="hidden md:flex flex-col w-[260px] bg-[#0A0A0A] border-r border-white/10">

  {/* Top */}
  <div className="p-3">

    <div className="text-white font-semibold text-lg mb-4">
      AIVIO
    </div>

    <button
      onClick={handleNewChat}
      className="w-full py-3 rounded-xl bg-[#1F1F1F] hover:bg-[#2A2A2A] transition mb-3"
    >
      + New Chat
    </button>

    <input
      type="text"
      placeholder="Search Chats"
      className="w-full p-3 rounded-xl bg-[#111111] border border-white/10 text-white outline-none"
    />
  </div>

  {/* Chats */}
  <div className="flex-1 overflow-y-auto px-3 space-y-2">

    {chats.map((chat) => (
      <div
        key={chat.id}
        onClick={() => openChat(chat)}
        className={`
          p-3 rounded-xl text-sm cursor-pointer truncate
          ${
            activeChatId === chat.id
              ? "bg-[#2A2A2A]"
              : "hover:bg-[#1A1A1A]"
          }
        `}
      >
        {chat.title}
      </div>
    ))}

  </div>

  {/* Bottom User */}
  <div className="border-t border-white/10 p-3">

    <div className="flex items-center gap-3">

      <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center">
        O
      </div>

      <div>
        <div className="text-sm text-white">
          Op
        </div>

        <div className="text-xs text-gray-400">
          Free Plan
        </div>
      </div>

    </div>

  </div>

</div>

        {/* Main Area */}
  <div
  className="flex-1 flex flex-col overflow-hidden"
  style={{ height: viewportHeight }}
  style={{
  height: viewportHeight,
  position: "relative"
}}
>
  <div
 className="md:hidden fixed top-12 left-4 right-4 z-[99999] flex items-center justify-between" 
>
  <button
    onClick={() => setShowMenu(!showMenu)}
    className="w-11 h-11 rounded-xl bg-[#1E1E1E] flex items-center justify-center text-white text-2xl"
  >
    ☰
  </button>

  <button
    className="w-11 h-11 rounded-xl bg-[#1E1E1E] flex items-center justify-center text-white text-2xl"
  >
    ⋮
  </button>
</div>

  
       {/* Mobile Chat List */}
{showMenu && (
  <div className="md:hidden fixed top-0 left-0 w-[280px] h-screen bg-[#0A0A0A] border-r border-white/10 z-[99999] p-4 overflow-y-auto">

    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">AIVIO</h2>

      <button
        onClick={() => setShowMenu(false)}
        className="px-3 py-2 rounded-lg bg-white/10"
      >
        ✕
      </button>
    </div>

    <button
      onClick={handleNewChat}
      className="w-full mb-3 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600"
    >
      + New Chat
    </button>

    <input
      type="text"
      placeholder="Search Chats"
      className="w-full mb-3 p-3 rounded-xl bg-[#111111] border border-white/10 text-white outline-none"
    />

    {chats.map((chat) => (
      <div
        key={chat.id}
        onClick={() => openChat(chat)}
        className="p-3 mb-2 rounded-xl bg-white/5 border border-white/10 text-sm cursor-pointer"
      >
        {chat.title}
      </div>
    ))}

    <div className="p-3 rounded-xl bg-[#111111] border border-white/10">
      Projects
    </div>

    <div className="p-3 rounded-xl bg-[#111111] border border-white/10">
      Settings
    </div>

    <div className="p-3 rounded-xl bg-[#111111] border border-white/10">
      Profile
    </div>

  </div>
)}  

        
    {/* Messages */}
  <div
  ref={chatContainerRef}
  className="absolute top-[70px] bottom-[80px] left-0 right-0 overflow-y-auto px-4"
>
  {messages.length === 0 ? (
    <p className="text-gray-400">
      Welcome to AIVIO AI 🚀
    </p>
  ) : (
    messages.map((msg, index) => (
      <div
        key={index}
        className={`w-full mb-2 ${
          msg.sender === "user"
            ? "text-right"
            : "text-left"
        }`}
      >
        <div className="text-white text-sm break-words">
          {msg.text}
        </div>
      </div>
    ))
  )}
</div>

      {/* Input */}
<div className="fixed bottom-0 left-0 right-0 z-[99999] bg-black px-3 pb-3">

  <div className="flex items-center gap-2">

    {/* Plus Button */}
    <button
      className="w-12 h-12 rounded-full bg-[#2f2f2f] text-white text-2xl flex items-center justify-center"
    >
      +
    </button>

    {/* Input Container */}
    <div className="flex-1 flex items-center bg-[#2f2f2f] rounded-full px-4">

      <textarea
        ref={textareaRef}
        placeholder="Message AIVIO..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={1}
        className="flex-1 bg-transparent py-3 text-white outline-none resize-none"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
          }
        }}
      />

      {/* Future Voice Button */}
      <button
        className="w-10 h-10 rounded-full bg-[#444] text-white flex items-center justify-center"
      >
        🎙
      </button>

    </div>

    {/* Send Button */}
    <button
  type="button"
  onMouseDown={(e) => e.preventDefault()}
  onClick={sendMessage}
  className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-xl font-bold"
>
  ↑
</button>
  </div>

</div> 
    </div> {/* Main Area close */}
    </div> {/* Root flex close */}

    </>
  )
}

export default Workspace

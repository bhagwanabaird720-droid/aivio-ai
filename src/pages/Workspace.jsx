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

useEffect(() => {
  const handleResize = () => {
    window.scrollTo(0, 0)
  }

  window.addEventListener("resize", handleResize)

  return () => {
    window.removeEventListener("resize", handleResize)
  }
}, [])
  useEffect(() => {
  chatContainerRef.current?.scrollTo({
    top: chatContainerRef.current.scrollHeight,
    behavior: "smooth",
  })
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

      <div className="flex h-[100dvh] bg-black text-white ">

        {/* Desktop Sidebar */}
        <div className="hidden md:flex flex-col w-[250px] border-r border-white/10 bg-[#0A0A0A] p-4">

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
     <div className="flex-1 mt-6 space-y-2 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => openChat(chat)}
                className="p-3 rounded-xl bg-[#111111] border border-white/10 text-sm truncate cursor-pointer hover:bg-[#1A1A1A]"
              >
                {chat.title}
              </div>
            ))}
          </div>

     <div className="border-t border-white/10 pt-4 mt-4 space-y-2">

  <div className="p-3 rounded-xl bg-[#111111] border border-white/10 cursor-pointer">
    Projects
  </div>

  <div className="p-3 rounded-xl bg-[#111111] border border-white/10 cursor-pointer">
    Settings
  </div>

  <div className="p-3 rounded-xl bg-[#111111] border border-white/10 cursor-pointer">
    Profile
  </div>

</div>
          
        </div>

        {/* Main Area */}
  <div className="flex-1 flex flex-col h-screen overflow-hidden">
  <div
  className="md:hidden fixed top-4 left-4 right-4 z-[99999] flex items-center justify-between pointer-events-auto"
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
  <div className="md:hidden fixed top-0 left-0 w-[280px] h-screen bg-[#0A0A0A] border-r border-white/10 z-[999] p-4 overflow-y-auto">

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
  className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-0.5 px-4 pt-16 pb-24"
>
  
  {messages.length === 0 ? (
    <p className="text-gray-400">
      Welcome to AIVIO AI 🚀
    </p>
  ) : (
    messages.map((msg, index) => (
      <div
        key={index}
        className={`break-words whitespace-pre-wrap ${
  msg.sender === "user"
    ? "self-end text-white max-w-[75%]"
    : "self-start text-white max-w-[75%]"
}`}
      >
        <div className="whitespace-pre-wrap break-words text-sm">
          {msg.text}
        </div>
      </div>
    ))
  )}
</div>

       {/* Input */}
<div className="fixed bottom-0 left-0 right-0 z-[99999] bg-black p-2">
  <div className="flex gap-2">

    <textarea
      ref={textareaRef}
      placeholder="Message AIVIO AI..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      rows={1}
      className="flex-1 bg-[#2f2f2f] rounded-full px-4 py-3 text-white outline-none"
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault()
          sendMessage()
        }
      }}
    />

    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={sendMessage}
      className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold"
    >
      ↑
    </button>

    </div>

  </div> {/* Input wrapper close */}
    </div> {/* Main Area close */}
    </div> {/* Root flex close */}

    </>
  )
}

export default Workspace

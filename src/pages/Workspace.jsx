const Workspace = () => {
  return (
    <div className="flex">

      {/* Sidebar */}
      <div className="w-[260px] h-screen bg-white/5 border-r border-white/10 p-4">
        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600">
          + New Chat
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-400">
          Start chatting with AIVIO AI 🚀
        </h1>
      </div>

    </div>
  )
}

export default Workspace

import Navbar from "../components/Navbar"

const Workspace = () => {
  return (
    <>
      <Navbar />

      <div className="flex gap-4 sticky bottom-0 bg-black/40 backdrop-blur-xl p-2 rounded-3xl">

        {/* Sidebar */}
        <div className="w-[260px] h-screen bg-white/5 border-r border-white/10 p-4">

          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600">
            + New Chat
          </button>

        </div>

        {/* Chat Area */}
        <div className="flex-1 flex items-center justify-center">

          <div className="w-full max-w-3xl px-6">

            <div className="h-[500px] bg-white/5 border border-white/10 rounded-3xl mb-6 p-6 overflow-y-auto flex flex-col gap-4">

            <div className="flex flex-col gap-4">

  <div className="self-start bg-white/10 px-5 py-3 rounded-2xl max-w-[80%]">
    Hello 👋
  </div>

  <div className="self-end bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-3 rounded-2xl max-w-[80%]">
    Hi AIVIO 🚀
  </div>

</div>

            </div>

            <div className="flex gap-4">

              <input
                type="text"
                placeholder="Message AIVIO AI..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white"
              />

              <button className="px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold">
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

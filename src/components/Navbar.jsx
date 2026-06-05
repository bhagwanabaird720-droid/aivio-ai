const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 border-b border-white/10 bg-black">

      <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
        AIVIO AI
      </h1>

      <div className="flex items-center gap-4">

        <button className="hidden md:block text-gray-300 hover:text-white transition">
          Features
        </button>

        <button className="hidden md:block text-gray-300 hover:text-white transition">
          Pricing
        </button>

        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold">
          Login
        </button>

      </div>

    </nav>
  )
}

export default Navbar

import FeatureCard from "../components/FeatureCard"
import Navbar from "../components/Navbar"

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <section className="flex flex-col items-center justify-center text-center px-6 py-32">

        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          AIVIO AI
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl text-lg">
          Futuristic AI Workspace for creators, students,
          developers and businesses.
        </p>

        <button className="mt-10 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all duration-300">
          Launch Workspace
        </button>

      </section>

    </div>
  )
}

export default Home

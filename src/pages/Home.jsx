import { Link } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import FeatureCard from "../components/FeatureCard"
import Navbar from "../components/Navbar"

const Home = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
  <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]"></div>

<div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]"></div>

      <section className="flex flex-col items-center justify-center text-center px-6 py-32">

        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          AIVIO AI
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl text-lg">
          Futuristic AI Workspace for creators, students,
          developers and businesses.
        </p>

    <Link
  to="/chat"
  className="mt-10 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:scale-105 transition-all duration-500"
>
  Launch Workspace
</Link>

      </section>
      <section className="px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

  <FeatureCard
    title="AI Chat"
    desc="Smart futuristic AI conversations with premium experience."
  />

  <FeatureCard
    title="Content Studio"
    desc="Generate captions, hooks, scripts and social media content."
  />

  <FeatureCard
    title="Image Generator"
    desc="Create futuristic AI images and creative prompts instantly."
  />
<FeatureCard
title="Study Studio"
desc="Homework solver, summaries, notes and AI explanations."
/>

<FeatureCard
title="Viral Hooks"
desc="Generate viral hooks, captions and high-engagement ideas."
/>
</section>

    </div>
  )
}

export default Home

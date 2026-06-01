const FeatureCard = ({ title, desc }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:scale-105 transition-all duration-300 hover:border-cyan-400/40">

      <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
        {title}
      </h2>

      <p className="text-gray-400 leading-relaxed">
        {desc}
      </p>

    </div>
  )
}

export default FeatureCard

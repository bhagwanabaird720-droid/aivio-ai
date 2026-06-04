import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import AIChat from "./pages/AIChat"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/chat" element={<AIChat />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App

import Navbar from "./Navbar"
import Pricing from "./pages/Pricing"
import Home from "./pages/Home"
import About from "./pages/About"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/distance-calculator" element={<Pricing />} />
          <Route path="/shipper-data" element={<About />} />
        </Routes>
      </div>
    </>
  )
}

export default App
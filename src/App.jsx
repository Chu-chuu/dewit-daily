import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Routine from "./pages/Routine";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import './App.css'
import Hero from "./components/hero";

function App() {


  return (
    <Router>
       <Navbar />
       <Hero/>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

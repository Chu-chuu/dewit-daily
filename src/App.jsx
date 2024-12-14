import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Routine from "./pages/Routine";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import Hero from "./components/Hero";

function App() {
  return (
    <Router>
      <div className="app-layout">
        {/* Navbar remains at the top */}
        <Navbar />
        <div className="page-content">
          <Routes>
            {/* Home page with Hero */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Home />
                </>
              }
            />
            {/* Other pages */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/routine" element={<Routine />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

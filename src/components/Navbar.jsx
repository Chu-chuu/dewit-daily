import React from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const location = useLocation(); // Get current route path

  return (
    <nav className="fixed top-0 left-0 right-0 p-2 bg-transparent text-primary backdrop-blur-lg shadow-md z-50">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto px-2">
        {/* Logo */}
        <div>
          <img src={logo} alt="DewIt Daily Logo" className="h-12 w-auto" />
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-4 text-sm">
          {[
            { name: "Home", path: "/" },
            { name: "Profile", path: "/profile" },
            { name: "Routine", path: "/routine" },
            { name: "Dashboard", path: "/dashboard" },
          ].map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`transition duration-300 ${
                  location.pathname === link.path
                    ? "text-secondary font-semibold"
                    : "hover:text-secondary"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">

  <div className="logo">
    🤖 Community Hero AI
  </div>

  <button
    className="menu-btn"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    {menuOpen ? <FaTimes /> : <FaBars />}
  </button>

  <div className={`nav-links ${menuOpen ? "active" : ""}`}>

    <Link to="/"
    onClick={() => setMenuOpen(false)}
    >Home</Link>

    <Link to="/report"
    onClick={() => setMenuOpen(false)}>
      Report Issue
    </Link>

    <Link to="/dashboard"
    onClick={() => setMenuOpen(false)}>
      Dashboard
    </Link>

    <Link to="/leaderboard"
    onClick={() => setMenuOpen(false)}>
      Leaderboard
    </Link>

  </div>

</nav>
  );
}

export default Navbar;
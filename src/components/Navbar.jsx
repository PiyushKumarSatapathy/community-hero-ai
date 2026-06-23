import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        Community Hero AI
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/report">
          Report Issue
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/leaderboard">
          Leaderboard
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
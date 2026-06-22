import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background:"#2563eb",
        padding:"15px",
        display:"flex",
        gap:"20px"
      }}
    >
      <Link style={{color:"white"}} to="/">Home</Link>

      <Link style={{color:"white"}} to="/report">
        Report Issue
      </Link>

      <Link style={{color:"white"}} to="/dashboard">
        Dashboard
      </Link>

      <Link style={{color:"white"}} to="/leaderboard">
        Leaderboard
      </Link>
    </nav>
  );
}

export default Navbar;
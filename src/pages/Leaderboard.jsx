import "./Leaderboard.css";

function Leaderboard() {
  return (
    <div className="leaderboard-container">

      <h1>Top Community Heroes</h1>

      <div className="leaderboard-card gold">
        <span>🥇</span>
        <h3>Rahul Sharma</h3>
        <p>120 Issues Reported</p>
      </div>

      <div className="leaderboard-card silver">
        <span>🥈</span>
        <h3>Priya Das</h3>
        <p>98 Issues Reported</p>
      </div>

      <div className="leaderboard-card bronze">
        <span>🥉</span>
        <h3>Amit Kumar</h3>
        <p>85 Issues Reported</p>
      </div>

    </div>
  );
}

export default Leaderboard;
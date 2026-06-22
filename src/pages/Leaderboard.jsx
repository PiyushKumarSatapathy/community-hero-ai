function Leaderboard() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>🏆 Community Heroes</h1>

      <table
        style={{
          marginTop: "20px",
          width: "600px",
          borderCollapse: "collapse",
          background: "white",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ background: "#2563eb", color: "white" }}>
            <th style={{ padding: "12px" }}>Rank</th>
            <th style={{ padding: "12px" }}>Name</th>
            <th style={{ padding: "12px" }}>Points</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={{ padding: "12px" }}>🥇 1</td>
            <td style={{ padding: "12px" }}>Piyush</td>
            <td style={{ padding: "12px" }}>120</td>
          </tr>

          <tr>
            <td style={{ padding: "12px" }}>🥈 2</td>
            <td style={{ padding: "12px" }}>Rahul</td>
            <td style={{ padding: "12px" }}>95</td>
          </tr>

          <tr>
            <td style={{ padding: "12px" }}>🥉 3</td>
            <td style={{ padding: "12px" }}>Amit</td>
            <td style={{ padding: "12px" }}>80</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
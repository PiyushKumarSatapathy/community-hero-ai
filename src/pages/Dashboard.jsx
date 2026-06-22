function Dashboard() {
  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <h1>Community Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            width: "220px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>120</h2>
          <p>Total Issues</p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            width: "220px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>35</h2>
          <p>Open Issues</p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            width: "220px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>85</h2>
          <p>Resolved Issues</p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            width: "220px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>12</h2>
          <p>Critical Issues</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
function Home() {
  return (
    <div>
      <section
        style={{
          textAlign: "center",
          padding: "80px 20px",
          background:
            "linear-gradient(135deg,#2563eb,#1e40af)",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "3rem" }}>
          Community Hero AI
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            marginTop: "20px",
          }}
        >
          AI Powered Hyperlocal Problem Solver
        </p>

        <button
          style={{
            marginTop: "30px",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Report Issue
        </button>
      </section>
      <section
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "40px",
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
    <p>Issues Reported</p>
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
    <p>Issues Resolved</p>
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
    <h2>500+</h2>
    <p>Citizens Engaged</p>
  </div>
</section>
    </div>
  );
}

export default Home;
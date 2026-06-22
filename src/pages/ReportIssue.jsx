function ReportIssue() {
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}
    >
      <h1>Report Community Issue</h1>

      <br />

      <label>Issue Title</label>

      <input
        type="text"
        placeholder="Enter issue title"
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "5px",
          marginBottom: "20px"
        }}
      />

      <label>Description</label>

      <textarea
        rows="5"
        placeholder="Describe the issue"
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "5px",
          marginBottom: "20px"
        }}
      />

      <label>Upload Image</label>

      <input
        type="file"
        style={{
          marginTop: "10px",
          marginBottom: "20px"
        }}
      />

      <br />

      <label>Location</label>

      <input
        type="text"
        placeholder="Enter location"
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "5px",
          marginBottom: "20px"
        }}
      />

      <button
        style={{
          background: "#2563eb",
          color: "white",
          padding: "12px 25px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Submit Issue
      </button>
    </div>
  );
}

export default ReportIssue;
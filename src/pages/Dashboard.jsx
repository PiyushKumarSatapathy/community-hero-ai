import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Dashboard Overview
      </h1>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h2>15</h2>
          <p>Total Reports</p>
        </div>

        <div className="dashboard-card">
          <h2>8</h2>
          <p>Resolved</p>
        </div>

        <div className="dashboard-card">
          <h2>7</h2>
          <p>Pending</p>
        </div>

      </div>
      <h2 style={{ marginBottom: "20px" }}>
  Recent Issues
</h2>

<table className="issues-table">

  <thead>
    <tr>
      <th>Issue</th>
      <th>Status</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Road Damage</td>
      <td>Pending</td>
    </tr>

    <tr>
      <td>Water Leakage</td>
      <td>Resolved</td>
    </tr>

    <tr>
      <td>Street Light</td>
      <td>Pending</td>
    </tr>
  </tbody>

</table>

    </div>
  );
}

export default Dashboard;
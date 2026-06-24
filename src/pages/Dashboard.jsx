import "./Dashboard.css";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

function Dashboard() {
  const [issues, setIssues] = useState([]);
  useEffect(() => {
  const fetchIssues = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "issues")
      );

      const issuesData = querySnapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );

      setIssues(issuesData);

    } catch (error) {
      console.error(error);
    }
  };

  fetchIssues();
}, []);
  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Dashboard Overview
      </h1>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h2>{issues.length}</h2>
          <p>Total Reports</p>
        </div>

        <div className="dashboard-card">
          <h2>0</h2>
          <p>Resolved</p>
        </div>

        <div className="dashboard-card">
          <h2>{issues.length}</h2>
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

  {issues.map((issue) => (

    <tr key={issue.id}>

      <td>{issue.title}</td>

      <td>
        <span className="pending">
          Pending
        </span>
      </td>

    </tr>

  ))}

</tbody>

</table>

    </div>
  );
}

export default Dashboard;
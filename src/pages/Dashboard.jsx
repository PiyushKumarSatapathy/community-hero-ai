import "./Dashboard.css";
import ai from "../services/gemini";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";
import { FaClipboardList, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { db } from "../services/firebase";
import toast from "react-hot-toast";
import { FaChevronDown } from "react-icons/fa";
import DashboardChart from "../components/DashboardChart";
const markerIcons = {
  High: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
  Medium: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  Low: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
};
function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [verifiedIssues, setVerifiedIssues] = useState(() => {
  return JSON.parse(localStorage.getItem("verifiedIssues")) || [];
});
  const { isLoaded } = useJsApiLoader({
  id: "google-map-script",
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  libraries: ["places"],
});
const mapCenter = {
  lat: 20.2961,
  lng: 85.8245,
};
const [aiInsights, setAiInsights] = useState("");
const [loadingInsights, setLoadingInsights] = useState(false);
const [aiAnalytics, setAiAnalytics] = useState(null);
const [loadingAI, setLoadingAI] = useState(false);
  useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "issues"),
    async (snapshot) => {
      const issuesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setIssues(issuesData);

      if (issuesData.length > 0) {
        await generateInsights(issuesData);
      }
    },
    (error) => {
      console.error(error);
    }
  );

  return () => unsubscribe();
}, []);
const verifyIssue = async (id) => {

  if (verifiedIssues.includes(id)) return;

  try {

    await updateDoc(doc(db, "issues", id), {
      verificationCount: increment(1),
    });

    const updated = [...verifiedIssues, id];

    setVerifiedIssues(updated);

    localStorage.setItem(
      "verifiedIssues",
      JSON.stringify(updated)
    );

  } catch (err) {

    console.log(err);

  }

};
const markResolved = async (id) => {
  if (!window.confirm("Mark this issue as resolved?")) {
    return;
}
  try {
    await updateDoc(doc(db, "issues", id), {
      status: "Resolved",
    });
    toast.success("Issue marked as resolved!");
    if (selectedIssue?.id === id) {
      setSelectedIssue((prev) => ({
        ...prev,
        status: "Resolved",
      }));
    }

  } catch (error) {
    console.error(error);
  }
};
const resolvedCount = issues.filter(
  (issue) => issue.status === "Resolved"
).length;

const pendingCount = issues.filter(
  (issue) => issue.status !== "Resolved"
).length;
const filteredIssues = issues.filter((issue) => {
  const matchesSearch =
   (
  issue.title +
  issue.location +
  issue.category +
  issue.department
)
.toLowerCase()
.includes(searchTerm.toLowerCase()) 

  const matchesStatus =
    statusFilter === "All" ||
    (issue.status || "Pending") === statusFilter;

  return matchesSearch && matchesStatus;
});
const generateInsights = async (issuesData) => {

  if (issuesData.length === 0) return;

  setLoadingInsights(true);

  try {

    const summary = issuesData.map(issue => ({
      title: issue.title,
      category: issue.category,
      priority: issue.priority,
      department: issue.department,
      status: issue.status,
      location: issue.location,
    }));

    const response = await ai.models.generateContent({

      model: "gemini-2.5-flash",

      contents: `
You are an AI civic analyst for a Smart Community Platform.

Analyze the issue dataset below.

Generate exactly 5 concise insights.

Rules:
- Maximum 18 words each.
- Start every line with "•".
- Mention trends instead of listing issues.
- Mention hotspots if applicable.
- Mention which department has the highest workload.
- Mention the percentage of resolved issues if possible.
- Mention the highest priority concern.
- Don't repeat the same category twice.

Dataset:

${JSON.stringify(summary)}

`,

    });

    setAiInsights(response.text);

  }

  catch(err){

    console.log(err);

  }

  finally{

    setLoadingInsights(false);

  }

};
const generateAnalytics = async () => {

  if (issues.length === 0) return;

  setLoadingAI(true);

  try {

    const summary = issues.map(issue => ({
      category: issue.category,
      department: issue.department,
      priority: issue.priority,
      location: issue.location,
      status: issue.status,
    }));

    const response = await ai.models.generateContent({

      model: "gemini-2.5-flash",

      contents: `
You are an AI Civic Analyst.

Analyze this issue dataset.

Return ONLY valid JSON.

Format:

{
"topIssue":"",
"busiestDepartment":"",
"hotspot":"",
"highPriorityCount":"",
"recommendation":""
}

Dataset:

${JSON.stringify(summary)}

`

    });

    const text = response.text
      .replace(/```json/g,"")
      .replace(/```/g,"")
      .trim();

    setAiAnalytics(JSON.parse(text));

  }

  catch(err){

    console.log(err);

  }

  finally{

    setLoadingAI(false);

  }

};
  return (
    <div className="dashboard-container">

  <h1 className="dashboard-title">
    Dashboard Overview
  </h1>

  <div className="dashboard-cards">

    <div className="dashboard-card">
      <div className="card-icon"><FaClipboardList /></div>
      <h2>{issues.length}</h2>
      <p>Total Reports</p>
    </div>

    <div className="dashboard-card">
      <div className="card-icon"><FaCheckCircle /></div>
      <h2>{resolvedCount}</h2>
      <p>Resolved</p>
    </div>

    <div className="dashboard-card">
      <div className="card-icon"><FaHourglassHalf /></div>
      <h2>{pendingCount}</h2>
      <p>Pending</p>
    </div>
    <DashboardChart
      resolved={resolvedCount}
      pending={pendingCount}
    />
  </div>
  <h2 className="map-title">
  🗺 Community Issue Map
</h2>
<div className="map-legend">

  <div className="legend-item">
    <span className="legend-dot high"></span>
    High Priority
  </div>

  <div className="legend-item">
    <span className="legend-dot medium"></span>
    Medium Priority
  </div>

  <div className="legend-item">
    <span className="legend-dot low"></span>
    Low Priority
  </div>

</div>

<div className="dashboard-map">

{isLoaded && (

<GoogleMap

mapContainerStyle={{
width:"100%",
height:"420px",
borderRadius:"16px"
}}

center={mapCenter}

zoom={13}

>
  {issues.map((issue) => (

<Marker
  key={issue.id}
  position={{
    lat: issue.latitude,
    lng: issue.longitude,
  }}
  icon={{
    path: window.google.maps.SymbolPath.CIRCLE,
    scale: 10,
    fillColor:
      issue.priority === "High"
        ? "#ef4444"
        : issue.priority === "Medium"
        ? "#f59e0b"
        : "#22c55e",
    fillOpacity: 1,
    strokeColor: "#ffffff",
    strokeWeight: 2,
  }}
  onClick={() => setSelectedIssue(issue)}
/>

))}
{selectedIssue && (

<InfoWindow

position={{
lat: selectedIssue.latitude,
lng: selectedIssue.longitude,
}}

onCloseClick={() => setSelectedIssue(null)}

>

<div>

<h3>{selectedIssue.title}</h3>

<p>
<b>Status:</b> {selectedIssue.status}
</p>

<p>
<b>Priority:</b> {selectedIssue.priority}
</p>

<p>
<b>Department:</b> {selectedIssue.department}
</p>

</div>

</InfoWindow>

)}

</GoogleMap>

)}

</div>
<div className="ai-btn-wrapper">

<button
className="ai-btn"
onClick={generateAnalytics}
>

{loadingAI

? "Analyzing..."

: "🤖 Generate AI Analytics"}

</button>

</div>
{aiAnalytics && (

<div className="analytics-grid">

<div className="analytics-card">
🏆
<h3>Most Common Issue</h3>
<p>{aiAnalytics.topIssue}</p>
</div>

<div className="analytics-card">
🏢
<h3>Busiest Department</h3>
<p>{aiAnalytics.busiestDepartment}</p>
</div>

<div className="analytics-card">
📍
<h3>Hotspot Area</h3>
<p>{aiAnalytics.hotspot}</p>
</div>

<div className="analytics-card">
🚨
<h3>High Priority Issues</h3>
<p>{aiAnalytics.highPriorityCount}</p>
</div>

<div className="analytics-card recommendation">
💡
<h3>AI Recommendation</h3>
<p>{aiAnalytics.recommendation}</p>
</div>

</div>

)}
<div className="ai-insights-card">
  <h2>🤖 AI Community Insights</h2>

  {loadingInsights ? (
    <p>Analyzing community data...</p>
  ) : (
    <pre>{aiInsights}</pre>
  )}
</div>
      <div className="filter-bar">

  <div className="search-box">

  <span className="search-icon">🔍</span>

  <input
    type="text"
    placeholder="Search issues..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-input"
  />

</div>

  <div className="filter-select">

  <button
    className="filter-btn"
    onClick={() => setFilterOpen(!filterOpen)}
  >
    {statusFilter}

    <span
      className={`filter-arrow ${filterOpen ? "rotate" : ""}`}
    >
      <FaChevronDown />
    </span>
  </button>

  {filterOpen && (
    <div className="filter-dropdown">

      <div
        className="filter-option"
        onClick={()=>{
          setStatusFilter("All");
          setFilterOpen(false);
        }}
      >
        All
      </div>

      <div
        className="filter-option"
        onClick={()=>{
          setStatusFilter("Pending");
          setFilterOpen(false);
        }}
      >
        Pending
      </div>

      <div
        className="filter-option"
        onClick={()=>{
          setStatusFilter("Resolved");
          setFilterOpen(false);
        }}
      >
        Resolved
      </div>

    </div>
  )}

</div>

</div>
    <h2 style={{ marginBottom: "20px" }}>
  Recent Issues
</h2>

<div className="table-container">
  <table className="issues-table">

    <thead>
      <tr>
        <th>Issue</th>
        <th>Category</th>
        <th>Priority</th>
        <th>Department</th>
        <th>Status</th>
        <th>Action</th>
        <th>Verification</th>
      </tr>
    </thead>

    <tbody>
      {filteredIssues.length === 0 ? (
    <tr>
      <td colSpan="7" style={{ textAlign: "center", padding: "30px" }}>
        🔍 No issues found.
      </td>
    </tr>
  ) : (
      filteredIssues.map((issue) => (
        <tr
  key={issue.id}
  onClick={() => setSelectedIssue(issue)}
  style={{ cursor: "pointer" }}
>

          <td>{issue.title}</td>

          <td>{issue.category || "N/A"}</td>

          <td>
            <span className={`priority ${issue.priority?.toLowerCase()}`}>
              {issue.priority || "N/A"}
            </span>
          </td>
          <td>
  <span className="department-badge">
    {issue.department || "N/A"}
  </span>
</td>

          <td>
            <span
              className={
                issue.status === "Resolved"
                  ? "status-resolved"
                  : "status-pending"
              }
            >
              {issue.status || "Pending"}
            </span>
          </td>

          <td>
            {issue.status !== "Resolved" && (
              <button
  className="resolve-btn"
  onClick={(e) => {
    e.stopPropagation();
    markResolved(issue.id);
  }}
>
                Resolve
              </button>
            )}
          </td>
           <td>
  <button
    className="verify-btn"
    disabled={verifiedIssues.includes(issue.id)}
    onClick={(e) => {
      e.stopPropagation();
      verifyIssue(issue.id);
    }}
  >
    {verifiedIssues.includes(issue.id)
      ? `✅ Verified (${issue.verificationCount || 0})`
      : `👍 Verify (${issue.verificationCount || 0})`}
  </button>
</td>
        </tr>
      ))
    )}
    </tbody>

  </table>
</div>  
{selectedIssue && (
  <div
    className="modal-overlay"
    onClick={() => setSelectedIssue(null)}
  >
    <div
      className="issue-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-header">

  <div>

    <h2>{selectedIssue.title}</h2>

    <p className="issue-subtitle">

      Community Issue Details

    </p>

  </div>

  <button
    className="close-btn"
    onClick={() => setSelectedIssue(null)}
  >
    ✖
  </button>

</div>

<hr className="modal-divider"/>

      <p><strong>📍 Location:</strong> {selectedIssue.location}</p>
      <a
  href={`https://www.google.com/maps?q=${selectedIssue.latitude},${selectedIssue.longitude}`}
  target="_blank"
  rel="noopener noreferrer"
  className="maps-link"
>
  📍 Navigate with Google Maps
</a>
      <p>
  <strong>📂 Category:</strong> {selectedIssue.category}
</p>

<p>
  <strong>🔥 Priority:</strong>

  <span
    className={`priority-badge ${selectedIssue.priority.toLowerCase()}`}
  >
    {selectedIssue.priority}
  </span>
</p>

<p>
  <strong>🏛 Department:</strong> {selectedIssue.department}
</p>

<p>
  <strong>📅 Status:</strong>

  <span
    className={
      selectedIssue.status === "Resolved"
        ? "status-badge resolved"
        : "status-badge pending"
    }
  >
    {selectedIssue.status}
  </span>
</p>
<p>

👥 <strong>Verified By:</strong>

<span className="verify-badge">

{selectedIssue.verificationCount}
{selectedIssue.verificationCount === 1 ? " Citizen" : " Citizens"}

</span>

</p>
      <hr />
      <p>
  <strong>🕒 Reported:</strong>{" "}
  {selectedIssue.createdAt?.toDate
    ? selectedIssue.createdAt.toDate().toLocaleString()
    : "N/A"}
</p>

      <div className="description-card">

<h3>📝 Description</h3>

<p>{selectedIssue.description}</p>

</div>

      <div className="ai-assessment-card">

  <h3>🤖 AI Assessment</h3>

  <div className="assessment-grid">

    <div className="assessment-item">

      <strong>🔥 Severity</strong>

      <span
        className={`severity-badge ${selectedIssue.severity?.toLowerCase()}`}
      >
        {selectedIssue.severity || "N/A"}
      </span>

    </div>

    <div className="assessment-item">

      <strong>⏳ Estimated Resolution</strong>

      <span>

        {selectedIssue.estimatedTime || "N/A"}

      </span>

    </div>

    <div className="assessment-item full-width">

      <strong>🛡 Prevention Tip</strong>

      <p>

        {selectedIssue.preventionTip || "No prevention tip available."}

      </p>

    </div>

    <div className="assessment-item full-width">

      <strong>💡 AI Recommendation</strong>

      <p>

        {selectedIssue.solution}

      </p>

    </div>

  </div>

</div>
      

    </div>
  </div>
)}
    </div>
  );
}

export default Dashboard;
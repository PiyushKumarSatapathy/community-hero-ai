import { useState,useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";
import "./ReportIssue.css";
import ai from "../services/gemini";
import toast from "react-hot-toast";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

function ReportIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [category, setCategory] = useState("");
const [priority, setPriority] = useState("");
const [department, setDepartment] = useState("");
const [severity, setSeverity] = useState("");

const [estimatedTime, setEstimatedTime] = useState("");

const [preventionTip, setPreventionTip] = useState("");
const [coordinates, setCoordinates] = useState(null);
const [marker, setMarker] = useState(null);
const [mapCenter, setMapCenter] = useState({
  lat: 20.2961,
  lng: 85.8245,
});
  const [loading, setLoading] = useState(false);
  const { isLoaded } = useJsApiLoader({
  id: "google-map-script",
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  libraries: ["places"],
});
const geocoderRef = useRef(null);

  const handleSubmit = async () => {
  if (loading) return;

  setLoading(true);
  setAiSuggestion("");
  setCategory("");
  setPriority("");
  setDepartment("");
  setSeverity("");
  setEstimatedTime("");
  setPreventionTip("");
  try {
    // Ask Gemini first
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an AI assistant for a Smart Community Issue Reporting Platform.

Analyze the reported issue carefully.

Return ONLY the format below.

Do not write explanations.

Rules:

Category MUST be one of:
Infrastructure
Electricity Supply
Water Supply
Road Safety
Sanitation
Traffic
Environment
Public Safety
Healthcare
Other

Priority MUST be:
Low
Medium
High

Department MUST be exactly one of:
Municipal Corporation
Electricity Board
Water Department
Police Department
Traffic Police
Public Works Department
Sanitation Department
Forest Department
Disaster Management

Severity MUST be one of:
Low
Moderate
High
Critical

Estimated Time should be realistic such as:
2-4 Hours
6-12 Hours
1-2 Days
3-5 Days
1 Week

Prevention Tip should be under 20 words.

Solution should be under 35 words.

Issue Title:
${title}

Description:
${description}

Location:
${location}

Return EXACTLY:

Category: <category>

Priority: <priority>

Department: <department>

Severity: <severity>

Estimated Time: <estimated time>

Prevention Tip: <tip>

Solution: <solution>

`,
    });

    const text = response.text.replace(/\*\*/g, "");

    const categoryMatch = text.match(/Category:\s*(.*)/i);
    const priorityMatch = text.match(/Priority:\s*(.*)/i);
    const departmentMatch = text.match(/Department:\s*(.*)/i);
    const severityMatch = text.match(/Severity:\s*(.*)/i);
    const estimatedTimeMatch = text.match(/Estimated Time:\s*(.*)/i);
    const preventionTipMatch = text.match(/Prevention Tip:\s*(.*)/i);
    const solutionMatch = text.match(/Solution:\s*([\s\S]*)/i);

    const category = categoryMatch?.[1]?.trim() || "Other";

const priority = priorityMatch?.[1]?.trim() || "Medium";

const department =
  departmentMatch?.[1]?.trim() || "Municipal Corporation";

const severity =
  severityMatch?.[1]?.trim() || "Moderate";

const estimatedTime =
  estimatedTimeMatch?.[1]?.trim() || "Not Available";

const preventionTip =
  preventionTipMatch?.[1]?.trim() || "No prevention tip available.";

const solution =
  solutionMatch?.[1]?.trim() || "No solution available.";

    // Show AI result
    setCategory(category);

setPriority(priority);

setDepartment(department);

setSeverity(severity);

setEstimatedTime(estimatedTime);

setPreventionTip(preventionTip);

setAiSuggestion(solution);
    // Save everything to Firestore
    await addDoc(collection(db, "issues"), {
      title,
      description,
      location,
      category,
      priority,
      department,
      severity,
      estimatedTime,
      preventionTip,
      solution,
      latitude: coordinates?.lat,
      longitude: coordinates?.lng,
      status: "Pending",
      createdAt: new Date(),
      verificationCount: 0,
    });

    setTitle("");
    setDescription("");
    setLocation("");
    setCoordinates(null);

    toast.success("Issue Submitted Successfully!");
  } catch (error) {

  console.error(error);

  try {

    await addDoc(collection(db, "issues"), {

      title,

      description,

      location,

      category: "Other",

      priority: "Medium",

      department: "Municipal Corporation",

      severity: "Moderate",

      estimatedTime: "Not Available",

      preventionTip: "AI analysis unavailable.",

      solution: "AI recommendation unavailable.",

      latitude: coordinates?.lat,

      longitude: coordinates?.lng,

      status: "Pending",

      createdAt: new Date(),

      verificationCount: 0,

    });

    setTitle("");
    setDescription("");
    setLocation("");
    setCoordinates(null);

    toast.success(
      "Issue submitted successfully. AI analysis is temporarily unavailable."
    );

  } catch (dbError) {

    console.error(dbError);

    toast.error("Unable to submit the issue.");

  }

} finally {

  setLoading(false);

}
};

  return (
    <div className="report-container">
      <h1 className="report-title">
        Report Community Issue
      </h1>
      <p className="report-subtitle">
  Help improve your community by reporting issues.
      </p>

      <label>Issue Title</label>

      <input
        type="text"
        placeholder="Enter issue title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-control"
      />

      <label>Description</label>

      <textarea
        rows="5"
        placeholder="Describe the issue"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-control"
      />

      <label>Location</label>

      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="form-control"
      />
      <button
  className="location-btn"
  onClick={() => {
    navigator.geolocation.getCurrentPosition((position) => {

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setMapCenter({ lat, lng });

      setMarker({ lat, lng });
      setCoordinates({ lat, lng });

      geocoderRef.current.geocode(
  { location: { lat, lng } },
  (results, status) => {
    if (status === "OK" && results[0]) {
      setLocation(results[0].formatted_address);
    }
  }
);
       
    });
  }}
>
  📍 Use Current Location
</button>
      {isLoaded && (
  <GoogleMap
    mapContainerStyle={{
      width: "100%",
      height: "350px",
      borderRadius: "12px",
      marginTop: "15px",
    }}
    center={mapCenter}
zoom={14}

onLoad={() => {
  geocoderRef.current = new window.google.maps.Geocoder();
}}

onClick={(e) => {

  const lat = e.latLng.lat();
  const lng = e.latLng.lng();

  setMarker({ lat, lng });
  setMapCenter({ lat, lng });
  setCoordinates({ lat, lng });

  geocoderRef.current.geocode(
    { location: { lat, lng } },
    (results, status) => {
      if (status === "OK" && results[0]) {
        setLocation(results[0].formatted_address);
      }
    }
  );

}}
  >
    {marker && <Marker position={marker} />}
  </GoogleMap>
)}
      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
    <div className="spinner"></div>
  ) : (
    "Submit Issue"
  )}
</button>
      {aiSuggestion && (
  <div className="ai-box">
    <h3>🤖 AI Suggestion</h3>
    <p>{aiSuggestion}</p>
  </div>
)}
  {category && (
  <div className="ai-details">

    <p><strong>Category:</strong> {category}</p>

    <p><strong>Priority:</strong> {priority}</p>

    <p><strong>Department:</strong> {department}</p>

  </div>
)}
    </div>
  );
}

export default ReportIssue;
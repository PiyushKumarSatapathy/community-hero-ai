import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";
import "./ReportIssue.css";
import ai from "../services/gemini";

function ReportIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (loading) return;

      setLoading(true);
  try {
    await addDoc(collection(db, "issues"), {
      title,
      description,
      location,
      status: "Pending",
      createdAt: new Date(),
    });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
Issue Title: ${title}

Description: ${description}

Location: ${location}

Give a short practical solution for this community issue.
`,
      });

      setAiSuggestion(response.text.replace(/\*\*/g, ""));
    } catch (aiError) {
      console.error("Gemini Error:", aiError);
      setAiSuggestion("AI suggestion unavailable right now.");
    }

    setTitle("");
    setDescription("");
    setLocation("");
    setLoading(false);
    alert("Issue Submitted Successfully!");

  } catch (error) {
    console.error("Firestore Error:", error);
    alert("Error saving issue");
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

      <label>Upload Image</label>

      <input
        type="file"
        className="file-input"
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
        className="submit-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Issue"}
      </button>
      {aiSuggestion && (
  <div className="ai-box">
    <h3>🤖 AI Suggestion</h3>
    <p>{aiSuggestion}</p>
  </div>
)}
    </div>
  );
}

export default ReportIssue;
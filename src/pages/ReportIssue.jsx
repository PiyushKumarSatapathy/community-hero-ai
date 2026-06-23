import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";
import "./ReportIssue.css";

function ReportIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "issues"), {
        title,
        description,
        location,
        createdAt: new Date(),
      });

      alert("Issue Submitted Successfully!");

      setTitle("");
      setDescription("");
      setLocation("");
    } catch (error) {
      console.error(error);
      alert("Error submitting issue");
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
      >
        Submit Issue
      </button>
    </div>
  );
}

export default ReportIssue;
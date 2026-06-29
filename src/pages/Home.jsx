import "./Home.css";
import WelcomePopup from "../components/WelcomePopup";
import {
  FaClipboardList,
  FaCheckCircle,
  FaBuilding
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
function Home() {
  const [issues, setIssues] = useState([]);
  useEffect(() => {
  const fetchIssues = async () => {
    const snapshot = await getDocs(collection(db, "issues"));

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setIssues(data);
  };

  fetchIssues();
}, []);
const totalReports = issues.length;

const resolvedReports = issues.filter(
  issue => issue.status === "Resolved"
).length;

const departments = new Set(
  issues.map(issue => issue.department)
).size;
  return (
    <div>
      <WelcomePopup />
      <section className="hero">
        <h1>
          Community Hero AI
        </h1>

        <p>
          Report. Track. Improve.
          
        </p>
        <p>
          AI-powered civic issue reporting
          for smarter communities.
        </p>

        <div className="hero-buttons">
          <Link to="/report">
            <button className="primary-btn">
              Report Issue
            </button>
          </Link>

          <Link to="/dashboard">
            <button className="secondary-btn">
              View Dashboard
            </button>
          </Link>
        </div>
      </section>
      <h2 className="stats-heading">
    Community Impact
</h2>

<p className="stats-subtitle">
    Building cleaner, smarter and more responsive communities through AI.
</p>

      <section className="stats">

        <div className="stat-card">

  <div className="stat-icon">
    <FaClipboardList />
  </div>

  <h2>{totalReports}</h2>

  <p>Issues Reported</p>

</div>
<div className="stat-card">

  <div className="stat-icon">
    <FaCheckCircle />
  </div>

  <h2>{resolvedReports}</h2>

  <p>Issues Resolved</p>

</div>
        <div className="stat-card">

  <div className="stat-icon">
    <FaBuilding />
  </div>

  <h2>{departments}</h2>

  <p>Departments</p>

</div>

      </section>
      <section className="features">

  <h2>Why Use Community Hero AI?</h2>

  <div className="feature-grid">

    <div className="feature-card">
      <h3>📍 Easy Reporting</h3>
      <p>
        Report civic issues with location, description and AI assistance in just a few clicks.
      </p>
    </div>

    <div className="feature-card">
      <h3>📊 Smart Dashboard</h3>
      <p>
        Monitor issue status, priorities, departments and analytics in real time.
      </p>
    </div>

    <div className="feature-card">
      <h3>🤖 AI Powered</h3>
      <p>
        Gemini AI automatically classifies issues, assigns departments and suggests solutions.
      </p>
    </div>

  </div>
  <section className="how-it-works">

  <h2>How It Works</h2>

  <div className="steps">

    <div className="step">
      <div className="step-icon">📝</div>
      <h3>Report Issue</h3>
      <p>Citizens submit community issues with location and description.</p>
    </div>

    <div className="arrow">→</div>

    <div className="step">
      <div className="step-icon">🤖</div>
      <h3>AI Analysis</h3>
      <p>Gemini AI analyzes the issue, assigns priority, category and responsible department.</p>
    </div>

    <div className="arrow">→</div>

    <div className="step">
      <div className="step-icon">🏛</div>
      <h3>Dashboard</h3>
      <p>Authorities monitor reports using the live dashboard and update issue progress.</p>
    </div>

    <div className="arrow">→</div>

    <div className="step">
      <div className="step-icon">✅</div>
      <h3>Issue Resolved</h3>
      <p>Authorities resolve issues and update their status in real time.</p>
    </div>

  </div>

</section>

</section>

    </div>
  );
}

export default Home;
<footer className="footer">

  <h3>Community Hero AI</h3>

  <p>
    AI-powered civic issue reporting system built for smarter communities.
  </p>

  <p>
    © 2026 Community Hero AI
  </p>

</footer>
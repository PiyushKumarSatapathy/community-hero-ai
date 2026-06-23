import "./Home.css";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>

      <section className="hero">
        <h1>
          Community Hero AI
        </h1>

        <p>
          Report. Track. Improve.
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

      <section className="stats">

        <div className="stat-card">
          <h2>120</h2>
          <p>Issues Reported</p>
        </div>

        <div className="stat-card">
          <h2>85</h2>
          <p>Issues Resolved</p>
        </div>

        <div className="stat-card">
          <h2>500+</h2>
          <p>Citizens Engaged</p>
        </div>

      </section>
      <section className="features">

  <h2>Why Use Community Hero AI?</h2>

  <div className="feature-grid">

    <div className="feature-card">
      <h3>📍 Easy Reporting</h3>
      <p>
        Report community issues in seconds.
      </p>
    </div>

    <div className="feature-card">
      <h3>📊 Live Dashboard</h3>
      <p>
        Track issues and monitor progress.
      </p>
    </div>

    <div className="feature-card">
      <h3>🤖 AI Powered</h3>
      <p>
        Smart categorization and analytics.
      </p>
    </div>

  </div>

</section>

    </div>
  );
}

export default Home;
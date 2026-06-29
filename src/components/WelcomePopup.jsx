import { useEffect, useState } from "react";
import "./WelcomePopup.css";

function WelcomePopup() {

  const [show, setShow] = useState(
  !sessionStorage.getItem("welcomeShown")
);

  useEffect(() => {

  if (!show) return;

  const timer = setTimeout(() => {
    sessionStorage.setItem("welcomeShown", "true");
    setShow(false);
  }, 30000);

  return () => clearTimeout(timer);

}, [show]);

if (!show) return null;
  return (

    <div className="popup-overlay">

      <div className="popup-card">

        <h1>👋 Welcome to Community Hero AI</h1>

        <h2>About This Prototype</h2>

        <p>
          <strong>Community Hero AI</strong> was designed and developed by
          <strong> Piyush Kumar Satapathy</strong>, a student of
          <strong> ITER, SOA University</strong>, specifically for the
          <strong> Vibe2Ship Hackathon.</strong>
        </p>

        <p>
          This prototype demonstrates an AI-assisted civic issue reporting
          platform where citizens can report community issues, monitor their
          status through a live dashboard, and explore department-wise
          analytics.
        </p>

        <h3>Prototype Notice</h3>

        <ul>

          <li>Login and authentication are not implemented.</li>

          <li>A dedicated Admin Panel is not included.</li>

          <li>
            All features are available in a demonstration environment.
          </li>

        </ul>

        <h3>About Issue Resolution</h3>

        <p>
          The <strong>"Resolved"</strong> status displayed in the dashboard is
          intended to demonstrate the application's workflow. In a real-world
          deployment, issue verification and resolution would be performed only
          by authorized municipal or government officials.
        </p>

        <p className="popup-note">
  This welcome message will close automatically in 30 seconds, or you may click <strong>"Enter Community Hero AI"</strong> to continue immediately.
</p>

        <button
          className="popup-btn"
          onClick={() => {
  sessionStorage.setItem("welcomeShown", "true");
  setShow(false);
}}
        >
          Enter Community Hero AI
        </button>

      </div>

    </div>

  );

}

export default WelcomePopup;
import "./Leaderboard.css";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "issues"));

        const departmentCount = {};

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          if (!data.department) return;

const dept = data.department;

departmentCount[dept] = (departmentCount[dept] || 0) + 1;
        });

        const sortedDepartments = Object.entries(departmentCount)
          .sort((a, b) => b[1] - a[1])
          .map(([department, count]) => ({
            department,
            count,
          }));

        setLeaderboard(sortedDepartments);

      } catch (error) {
        console.error(error);
      }
    };

    fetchLeaderboard();
  }, []);

  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  const getCardClass = (index) => {
    if (index === 0) return "gold";
    if (index === 1) return "silver";
    if (index === 2) return "bronze";
    return "";
  };

  return (
    <div className="leaderboard-container">

      <h1>Department Leaderboard</h1>

      <p className="leaderboard-subtitle">
        Departments ranked by the number of reported issues.
      </p>

      {leaderboard.map((item, index) => (
        <div
          key={item.department}
          className={`leaderboard-card ${getCardClass(index)}`}
        >
          <span className="leaderboard-rank">
            {getMedal(index)}
          </span>

          <h3>{item.department}</h3>

          <div className="leaderboard-info">
  <p>{item.count} Issues</p>

  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{
        width: `${(item.count / leaderboard[0].count) * 100}%`,
      }}
    ></div>
  </div>
</div>
        </div>
      ))}

    </div>
  );
}

export default Leaderboard;
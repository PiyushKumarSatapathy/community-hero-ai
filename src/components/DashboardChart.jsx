import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./DashboardChart.css";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function DashboardChart({ resolved, pending }) {
  const data = {
    labels: ["Resolved", "Pending"],

    datasets: [
      {
        data: [resolved, pending],

        backgroundColor: [
          "#22c55e",
          "#f59e0b",
        ],

        borderWidth: 0,
      },
    ],
  };
return (
  <div className="chart-card">

    <h3>Issue Status</h3>

    <div style={{ width: "220px" }}>
      <Pie data={data} />
    </div>

  </div>
);
  
}

export default DashboardChart;
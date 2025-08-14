import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./ActivityChart.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ActivityChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [20, 40, 30, 40, 50, 40, 20],
        backgroundColor: "#c8db4d",
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { display: false },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="activity-card">
      <div className="chart-header">
        <h4>Activity</h4>
        <select>
          <option>Weekly</option>
        </select>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ActivityChart;


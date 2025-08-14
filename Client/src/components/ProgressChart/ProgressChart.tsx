import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip
} from "chart.js";
import "./ProgressChart.css";

ChartJS.register(ArcElement, Tooltip);

const ProgressChart = () => {
  const data = {
    labels: ["Cardio", "Stretching", "Treadmill", "Strength"],
    datasets: [
      {
        data: [30, 40, 30, 20],
        backgroundColor: ["#20b2aa", "#ffa07a", "#ff6347", "#9370db"],
        borderWidth: 0,
       
      },
    ],
  };


  return (
    <div className="progress-card">
      <div className="chart-header">
        <h4>Progress</h4>
        <select>
          <option>Weekly</option>
        </select>
      </div>

      <div className="progress-content">
        <div className="donut-chart">
          <Doughnut data={data} />
          <div className="donut-center">
            <p>Stretching</p>
            <h3>40hrs</h3>
          </div>
        </div>

       <div className="legend">
  <div>
    <span className="dot" style={{ background: "#20b2aa" }}></span> 
    Cardio — 30 hrs
  </div>
  <div>
    <span className="dot" style={{ background: "#ffa07a" }}></span> 
    Stretching — 40 hrs
  </div>
  <div>
    <span className="dot" style={{ background: "#ff6347" }}></span> 
    Treadmill — 30 hrs
  </div>
  <div>
    <span className="dot" style={{ background: "#9370db" }}></span> 
    Strength — 20 hrs
  </div>
</div>

      </div>
    </div>
  );
};

export default ProgressChart;

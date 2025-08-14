import { FaWalking, FaTint, FaFire, FaHeart } from "react-icons/fa";
import GaugeCard from "../style/Card-3/GaugeCard";
import ArcDesign from "../style/Card-4/GaugeArcWater";
import "./StatsSection.css";

interface StatsSectionProps {
  currentSteps: number;
  stepsGoal: number;
  currentWater: number;
  waterGoal: number;
}

const StatsSection = ({
  currentSteps,
  stepsGoal,
  currentWater,
  waterGoal,
}: StatsSectionProps) => {
  const stepsProgress =
    stepsGoal > 0 ? Math.round((currentSteps / stepsGoal) * 100) : 0;

  return (
    <div className="stats-section">
      <div className="stat-card card-steps">
        <div className="stat-icon steps">
          <FaWalking />
        </div>
        <div className="stat-info">
          <h3>Steps</h3>
          <p className="stat-value">
            {currentSteps} <span className="unit">steps</span>
          </p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${stepsProgress}%` }}
            ></div>
          </div>
          <h5>
            {stepsProgress}% of {stepsGoal} goal
          </h5>
        </div>
      </div>
      <div className="stat-card card-water">
        <div className="stat-icon water">
          <FaTint />
        </div>
        <div className="stat-info">
          <h3>Water</h3>
          <p className="stat-value">
            {currentWater} <span className="unit">L</span>
          </p>
          <h4>{waterGoal} L goal</h4>
          <ArcDesign value={currentWater} />
        </div>
      </div>

      <div className="stat-card card-calories">
        <div className="stat-icon calories">
          <FaFire />
        </div>
        <div className="stat-info">
          <div className="calories-content">
            <h3>Calories</h3>
            <p className="stat-value">
              580 <span className="unit">kcal</span>
            </p>
          </div>
          <GaugeCard />
        </div>
      </div>

      <div className="stat-card card-heart">
        <div className="stat-icon heart">
          <FaHeart />
        </div>
        <div className="stat-info">
          <h3>Heart Rate</h3>
          <p className="stat-value">
            78 <span className="unit">bpm</span>
          </p>
          <h5>Normal</h5>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;

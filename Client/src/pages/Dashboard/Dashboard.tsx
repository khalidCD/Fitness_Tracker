import  { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import StatsSection from "../../components/StatsSection/StatsSection";
import ActivityChart from "../../components/ActivityChart/ActivityChart";
import ProgressChart from "../../components/ProgressChart/ProgressChart";
import RecommendedTrainer from "../../components/RecommendedTrainer/RecommendedTrainer";
import MealCard from "../../components/MealCard/MealCard";
import ActivityModal from "../../components/ActivityModal/ActivityModal";
import { FaPlus } from "react-icons/fa";
import "./Dashboard.css";
import  type { PersonalData, GoalsData, ActivityData } from "../../../src/types/userTypes";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard= ({ onLogout }:DashboardProps ) => {
  const [goalsData, setGoalsData] = useState<GoalsData | null>(null);
  const [personalData, setPersonalData] = useState<PersonalData | null>(null);
  const [activityData, setActivityData] = useState<ActivityData | null>(null);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [dataVersion, setDataVersion] = useState(0);

  const forceUpdate = () => {
    setDataVersion(prev => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const userDataString = localStorage.getItem('user');
      if (!userDataString) return;
      const username = JSON.parse(userDataString).username;
      if (!username) return;

      const today = new Date().toISOString().split('T')[0];
      try {
        const [goalsRes, personalRes, activityRes] = await Promise.all([
          fetch(`http://localhost:4000/api/goals/${username}`),
          fetch(`http://localhost:4000/api/personal/${username}`),
          fetch(`http://localhost:4000/api/activity/${username}/${today}`)
        ]);
        if (goalsRes.ok) setGoalsData(await goalsRes.json());
        if (personalRes.ok) setPersonalData(await personalRes.json());
        if (activityRes.ok) setActivityData(await activityRes.json());
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, [dataVersion]);

  const handleActivitySave = async (newActivity: { steps: number; water: number }) => {
    const username = JSON.parse(localStorage.getItem('user') || '{}').username;
    if (!username) return;

    const payload = { username, ...newActivity };
    try {
      const response = await fetch("http://localhost:4000/api/activity", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to save activity");
      setIsActivityModalOpen(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
      alert("Error saving activity.");
    }
  };

  const hour = new Date().getHours(); 
const greeting = hour < 12 
    ? "Morning" 
    : hour < 16 
        ? "Afternoon" 
        : "Night";

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <Sidebar />
      </aside>
      <main className="main-content">
        <div className="dashboard-header">
          <div>
            <h2>Good {greeting}</h2>
            <h1 className="dashboard-title">Welcome Back</h1>
          </div>
          <button className="add-activity-btn" onClick={() => setIsActivityModalOpen(true)}>
            <FaPlus /> Log Activity
          </button>
        </div>
        <StatsSection
          currentSteps={activityData?.steps || 0}
          currentWater={activityData?.water || 0}
          stepsGoal={goalsData?.steps || 0}
          waterGoal={goalsData?.waterliters || 0}
        />
        <div className="charts-row">
          <ActivityChart />
          <ProgressChart />
        </div>
        <RecommendedTrainer />
        <MealCard />
      </main>
      <aside className="profile-section">
        <ProfileSidebar
          personalData={personalData}
          goalsData={goalsData}
          onProfileSave={forceUpdate}
          onLogout={onLogout}
        />
      </aside>
      <ActivityModal 
        isOpen={isActivityModalOpen} 
        onClose={() => setIsActivityModalOpen(false)}
        onSave={handleActivitySave} 
      />
    </div>
  );
};

export default Dashboard;
import { useState } from "react";
import "./ProfileSidebar.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ProfileModal from "../ProfileForm/ProfileForm";
import type { PersonalData, GoalsData } from "../../../src/types/userTypes";

import runningIcon from "../../../public/assets/running.png";
import sleepingIcon from "../../../public/assets/sleeping.png";
import targetIcon from "../../../public/assets/weightLoss.png";
import yogaIcon from "../../../public/assets/yoga.png";
import swimmingIcon from "../../../public/assets/yoga.png";


interface ProfileSidebarProps {
  personalData: PersonalData | null;
  goalsData: GoalsData | null;
  onProfileSave: () => void;
  onLogout: () => void;
}

const ProfileSidebar = ({
  personalData,
  goalsData,
  onProfileSave,
  onLogout,
}:ProfileSidebarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ProfileCompletion = () => {
    let completedFields = 0;
    const totalFields = 10;

    if (personalData) {
      if (personalData.fullname) completedFields++;
      if (personalData.location) completedFields++;
      if (personalData.dob) completedFields++;
      if (personalData.height > 0) completedFields++;
      if (personalData.weight > 0) completedFields++;
    }
    if (goalsData) {
      if (goalsData.steps > 0) completedFields++;
      if (goalsData.runningkm > 0) completedFields++;
      if (goalsData.sleephours > 0) completedFields++;
      if (goalsData.targetweight > 0) completedFields++;
      if (goalsData.waterliters > 0) completedFields++;
    }
    return Math.min((completedFields / totalFields) * 100, 100);
  };

  const calculateAge = (dobString: string): number => {
    if (!dobString) return 0;
    const birthDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    onProfileSave();
  };

  const age = personalData ? calculateAge(personalData.dob) : 0;
  const profileCompletion =ProfileCompletion();

  const personalWeight = personalData?.weight || 0;
  const targetWeight = goalsData?.targetweight || 0;
  let weightLabel = "Weight Target";
  if (targetWeight && personalWeight) {
    if (targetWeight < personalWeight) weightLabel = "Weight Loss Target";
    else if (targetWeight > personalWeight) weightLabel = "Weight Gain Target";
  }

  return (
    <div className="profile-sidebar">
      <div className="profile-header">
        <Avatar src="https://randomuser.me/api/portraits/men/75.jpg" />
        <div className="profile-info">
          <h4>{personalData?.fullname || "Welcome!"}</h4>
          <p>{personalData?.location || "Set your location"}</p>
        </div>
        <PowerSettingsNewIcon
          className="logout-icon"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div className="profile-completion">
        <span className="completion-percent">{profileCompletion}%</span>
        <span className="completion-text">your Profile set</span>
        <Button
          variant="contained"
          className="edit-profile-button"
          style={{ backgroundColor: "#c8e72bff", color: "#000" }}
          onClick={() => setIsModalOpen(true)}
        >
         {profileCompletion === 100 ?"Edit your profile": "Edit your profile"}
        </Button>
      </div>

      <div className="profile-stats">
        <div>
          <h3>
            {personalData?.weight || 0}
          </h3>
            <h6>kg</h6>

          <p>Weight</p>
        </div>
        <div>
          <h3>
            {personalData?.height || 0}
          </h3>
            <h6>cm</h6>

          <p>Height</p>
        </div>
        <div>
          <h3>
            {age}
          </h3>
            <h6>yrs</h6>

          <p>Age</p>
        </div>
      </div>

      <div className="profile-section">
        <h4>Your Goals</h4>

        {/* 2. Replace emojis with img tags */}
        <div className="goal-card">
          <img src={runningIcon} alt="Running icon" className="goal-icon" /> <span>Running</span>
          <h4>{goalsData?.runningkm || 0} Km</h4>
        </div>

        <div className="goal-card">
          <img src={sleepingIcon} alt="Sleeping icon" className="goal-icon" /> <span>Sleeping</span>
          <h4>
            {goalsData?.sleephours || 0} hrs
          </h4>
        </div>

        <div className="goal-card">
          <img src={targetIcon} alt="Target icon" className="goal-icon" /> <span>{weightLabel}</span>
          <h4>{targetWeight || 0} kg</h4>
        </div>
      </div>

      <div className="profile-section">
        <h4>Scheduled</h4>
        <div className="schedule-card">
          <img src={yogaIcon} alt="Yoga icon" className="schedule-icon" />
          <div>
            <h4>Training - Yoga Class</h4>
            <p>Fitness</p>
          </div>
          <span>22 Mar</span>
        </div>
        <div className="schedule-card">
          <img src={swimmingIcon} alt="Swimming icon" className="schedule-icon" />
          <div>
            <strong>Training - Swimming</strong>
            <p>Fitness</p>
          </div>
          <span>22 Mar</span>
        </div>
      </div>

      <ProfileModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default ProfileSidebar;
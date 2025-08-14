import React, { useState } from "react";
import "./ProfileForm.css";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }:ProfileModalProps) => {
  const [activeTab, setActiveTab] = useState<"personal" | "goals">("personal");

  const [personalInfo, setPersonalInfo] = useState({
    fullname: "",
    location: "",
    dob: "",
    height: "",
    weight: ""
  });

  const [goals, setGoals] = useState({
    steps: "",
    runningkm: "",
    sleephours: "",
    targetweight: "",
    waterliters: ""
  });

  if (!isOpen) return null;

  const handleSave = async () => {
    const userDataString = localStorage.getItem('user');
    if (!userDataString) {
      alert("No user logged in. Please log in and try again.");
      return;
    }
    const userData = JSON.parse(userDataString);
    const loggedInUsername = userData.username;

    if (!loggedInUsername) {
        alert("Could not find username in stored user data.");
        return;
    }

    const personalPayload = {
      username: loggedInUsername,
      fullname: personalInfo.fullname,
      location: personalInfo.location,
      dob: personalInfo.dob || null,
      height: parseInt(personalInfo.height) || 0,
      weight: parseInt(personalInfo.weight) || 0,
    };

    const goalsPayload = {
      username: loggedInUsername,
      steps: parseInt(goals.steps) || 0,
      runningkm: parseInt(goals.runningkm) || 0,
      sleephours: parseInt(goals.sleephours) || 0,
      targetweight: parseInt(goals.targetweight) || 0,
      waterliters: parseFloat(goals.waterliters) || 0,
    };
    

    let isSuccess = false;

    try {
      const personalResponse = await fetch("http://localhost:4000/api/personal", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(personalPayload), 
      });

      if (!personalResponse.ok) throw new Error('Failed to save personal data');

      const goalsResponse = await fetch("http://localhost:4000/api/goals", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goalsPayload), 
      });

      if (!goalsResponse.ok) throw new Error('Failed to save goals data');
      
      console.log("Form data saved successfully!");
      isSuccess = true;

    } catch (error) {
      console.error("Failed to save form data", error);
      alert("Failed to save profile. Please check the console for errors.");
      isSuccess = false;
    }
    
    if (isSuccess) {
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "personal" | "goals"
  ) => {
    const { name, value } = e.target;
    if (type === "personal") {
      setPersonalInfo((prev) => ({ ...prev, [name]: value }));
    } else {
      setGoals((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Set your profile</h3>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        <div className="tab-buttons">
          <button
            className={activeTab === "personal" ? "active" : ""}
            onClick={() => setActiveTab("personal")}
          >
            Personal Information
          </button>
          <button
            className={activeTab === "goals" ? "active" : ""}
            onClick={() => setActiveTab("goals")}
          >
            Set your goals
          </button>
        </div>
        <div className="form-section">
          {activeTab === "personal" ? (
            <>
              <input type="text" name="fullname" placeholder="Full Name" value={personalInfo.fullname} onChange={(e) => handleChange(e, "personal")} />
              <input type="text" name="location" placeholder="Your Location" value={personalInfo.location} onChange={(e) => handleChange(e, "personal")} />
              <input type="date" name="dob" value={personalInfo.dob} onChange={(e) => handleChange(e, "personal")} />
              <input type="number" name="height" placeholder="Your Height in cm" value={personalInfo.height} onChange={(e) => handleChange(e, "personal")} />
              <input type="number" name="weight" placeholder="Your Weight in kg" value={personalInfo.weight} onChange={(e) => handleChange(e, "personal")} />
            </>
          ) : (
            <>
              <input type="number" name="steps" placeholder="Steps per day" value={goals.steps} onChange={(e) => handleChange(e, "goals")} />
              <input type="number" name="runningkm" placeholder="Running per day in km" value={goals.runningkm} onChange={(e) => handleChange(e, "goals")} />
              <input type="number" name="sleephours" placeholder="Sleep per day in hours" value={goals.sleephours} onChange={(e) => handleChange(e, "goals")} />
              <input type="number" name="targetweight" placeholder="Target weight in kg" value={goals.targetweight} onChange={(e) => handleChange(e, "goals")} />
              <input type="number" name="waterliters" placeholder="Water Ltr per day" value={goals.waterliters} onChange={(e) => handleChange(e, "goals")} />
            </>
          )}
        </div>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="save-button" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
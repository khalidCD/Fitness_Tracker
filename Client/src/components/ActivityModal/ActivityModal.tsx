import { useState } from "react";
import "./ActivityModal.css";

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activityData: { steps: number; water: number }) => void;
}

const ActivityModal = ({ isOpen, onClose, onSave }:ActivityModalProps) => {
  const [steps, setSteps] = useState("");
  const [water, setWater] = useState("");

  if (!isOpen) return null;

  const handleSaveClick = () => {
    onSave({
      steps: parseInt(steps) || 0,
      water: parseFloat(water) || 0,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Log Today's Activity</h3>
        <input
          type="number"
          placeholder="Steps walked today"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
        <input
          type="number"
          placeholder="Liters of water"
          value={water}
          onChange={(e) => setWater(e.target.value)}
        />
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="save-button" onClick={handleSaveClick}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ActivityModal;
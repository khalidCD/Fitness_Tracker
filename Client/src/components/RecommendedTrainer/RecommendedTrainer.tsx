import "./RecommendedTrainer.css";

const RecommendedTrainer = () => {
  return (
    <div className="recommended-trainer">
      <h3>Recommended Trainer for you</h3>
      <div className="trainer-list">
        
      
        <div className="trainer-card">
          <img
            className="trainer-img"
            src="/assets/Screenshot From 2025-08-12 23-18-50.png"
            alt="Cameron Williamson"
          />
          <h4>Cameron Williamson</h4>
          <p>Fitness Specialist</p>
          <div className="trainer-stats">
            <span>🏅 25</span>
            <span>⭐ 104</span>
          </div>
          <button className="view-profile-button">View Profile</button>
        </div>

      
        <div className="trainer-card">
          <img
            className="trainer-img"
            src="/assets/Screenshot From 2025-08-12 23-18-57.png"
            alt="John Smith"
          />
          <h4>John Smith</h4>
          <p>Fitness Coach</p>
          <div className="trainer-stats">
            <span>🏅 18</span>
            <span>⭐ 90</span>
          </div>
          <button className="view-profile-button">View Profile</button>
        </div>
        
      </div>
    </div>
  );
};

export default RecommendedTrainer;


import "./MealCard.css";

const MealCard = () => {
  return (
    <div className="meal-card">
      <div className="meal-card-header">
        <span className="meal-title">Breakfast</span>
        <span className="meal-time">10:00 am</span>
      </div>

      <div className="meal-item">
        <img
          src="/assets/Screenshot From 2025-08-12 23-46-14.png"
          alt="Avocado salad"
          className="meal-img"
        />
        <div className="meal-info">
          <h4>Avocado salad</h4>
          <div className="nutrients">
            <span className="carbs">8% carbs</span>
            <span className="protein">16% protein</span>
            <span className="fat">6% Fat</span>
          </div>
          <div className="progress-bars">
            <div className="progress-bar carbs-bar" style={{ width: "8%" }}></div>
            <div className="progress-bar protein-bar" style={{ width: "16%" }}></div>
            <div className="progress-bar fat-bar" style={{ width: "6%" }}></div>
          </div>
        </div>
      </div>


      <div className="meal-item">
        <img
          src="/assets/Screenshot From 2025-08-12 23-47-02.png"
          alt="Blueberry"
          className="meal-img"
        />
        <div className="meal-info">
          <h4>Blueberry</h4>
          <div className="nutrients">
            <span className="carbs">8% carbs</span>
            <span className="protein">16% protein</span>
            <span className="fat">6% Fat</span>
          </div>
          <div className="progress-bars">
            <div className="progress-bar carbs-bar" style={{ width: "8%" }}></div>
            <div className="progress-bar protein-bar" style={{ width: "16%" }}></div>
            <div className="progress-bar fat-bar" style={{ width: "6%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;

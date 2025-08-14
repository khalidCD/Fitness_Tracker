import "./Sidebar.css";
import {FitnessCenter,Home,ShowChart,DirectionsRun,ChatBubbleOutline,Explore,Settings,Logout} from "@mui/icons-material";


const Sidebar  = () => {
  const menuItems = [
    { icon: <Home />, active: true },
    { icon: <ShowChart /> },
    { icon: <DirectionsRun /> },
    { icon: <ChatBubbleOutline /> },
    { icon: <Explore/> },
    { icon: <Settings /> },
    { icon: <Logout/> },
  ];

  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-circle">
          <FitnessCenter fontSize="large" />
        </div>
        <span className="logo-text">Healthy</span>
      </div>

 
      <div className="sidebar-menu">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`menu-icon ${item.active ? "active" : ""}`}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

import React from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "./context/AuthContext";  
import { useNavigate } from 'react-router-dom';

const OrgOverview = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    // Perform logout action
    logout();
    // Redirect to login page or any other page
    navigate('/');
  };

  return (
    <div className="org-overview">
      <h1>Org Overview</h1>
      <Button variant="danger" onClick={handleLogout}>Logout</Button>
      {/* Placeholder for pie chart */}
      <div className="pie-chart-container">
        {/* Add your pie chart component here */}
        <p>Pie Chart will be displayed here</p>
      </div>
    </div>
  );
};

export default OrgOverview;

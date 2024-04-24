import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PieChart from './PieChart';

const OrgOverview = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [chartData, setChartData] = useState([]);

  // Mock data for demonstration purposes
  useEffect(() => {
    // Replace this with actual data from your API
    setChartData([30, 20, 40, 25, 35]);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="org-overview">
      <h1>Org Overview</h1>
      <Button variant="danger" onClick={handleLogout}>Logout</Button>
      <div className="pie-chart-container">
        <PieChart data={chartData} />
      </div>
    </div>
  );
};

export default OrgOverview;

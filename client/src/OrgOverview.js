import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PieChart from './PieChart';
import axios from 'axios'; // Import Axios for making HTTP requests

const OrgOverview = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get('/api/pieChart');
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    fetchChartData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import { useNavigate } from 'react-router-dom';

const OrgOverview = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          console.error('No auth token');
          navigate('/login');
          return;
        }

        const response = await axios.get('/api/pieChart', {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        navigate('/error'); // or handle errors appropriately
      }
    };

    fetchChartData();
  }, [navigate]);

  return (
    <div className="main">
      <h1>Organization Overview</h1>
      <div className="chart-container">
        <div className="canvas-container">
          <ChartComponent data={chartData} chartType="pie" />
        </div>
        <div className="canvas-container">
          <ChartComponent data={chartData} chartType="bar" />
        </div>
      </div>
    </div>
  );
};

export default OrgOverview;

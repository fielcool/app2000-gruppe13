import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import { useNavigate } from 'react-router-dom';

const OrgOverview = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('bar'); // default to bar

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
        navigate('/error'); // Handle errors appropriately
      }
    };

    fetchChartData();
  }, [navigate]);

  return (
    <div>
      <h1>Organization Overview</h1>
      <div>
        <button onClick={() => setChartType('pie')}>Show Pie Chart</button>
        <button onClick={() => setChartType('bar')}>Show Bar Chart</button>
      </div>
      <div className="chart-container">
        <ChartComponent data={chartData} chartType={chartType} />
      </div>
    </div>
  );
};

export default OrgOverview;

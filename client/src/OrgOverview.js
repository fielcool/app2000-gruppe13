import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import { useNavigate } from 'react-router-dom';

const OrgOverview = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('bar'); // You can toggle between 'pie' and 'bar'

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          console.error('No auth token');
          navigate('/login');
          return;
        }

        const response = await axios.get('/api/pieChart', { // Make sure endpoint is correct
          headers: { Authorization: `Bearer ${authToken}` }
        });

        // Transforming data to array of objects as expected
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
        navigate('/error'); // or handle errors appropriately
      }
    };

    fetchChartData();
  }, [navigate]);

  return (
    <div>
      <h1>Organization Overview</h1>
      <button onClick={() => setChartType('pie')}>Show Pie Chart</button>
      <button onClick={() => setChartType('bar')}>Show Bar Chart</button>
      <ChartComponent data={chartData} chartType={chartType} />
    </div>
  );
};

export default OrgOverview;

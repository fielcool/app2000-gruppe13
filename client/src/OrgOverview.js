import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PieChart from './PieChart';
import { useNavigate } from 'react-router-dom';

const OrgOverview = () => {
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

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

        // Assuming the data comes in as [{domain: 'N', score: 154}, ...]
        const scores = response.data.map(item => item.score);
        setChartData(scores);
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
      <PieChart data={chartData} />
    </div>
  );
};

export default OrgOverview;

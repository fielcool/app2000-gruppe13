import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import { useNavigate } from 'react-router-dom';

const OrgOverview = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('bar'); // default to bar
  const [highestScore, setHighestScore] = useState('');
  const [lowestScore, setLowestScore] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('- Nevrotisisme: Nevrotisisme omhandler tendensen til å oppleve negative følelser.');

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          console.error('No auth token');
          navigate('/login');
          return;
        }

        const response = await axios.get('/api/chart', {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setChartData(response.data);

        // Calculate highest and lowest scores
        const scores = response.data.map(item => item.score);
        const maxScore = Math.max(...scores);
        const minScore = Math.min(...scores);
        setHighestScore(maxScore);
        setLowestScore(minScore);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        navigate('/error'); // Handle errors appropriately
      }
    };

    fetchChartData();
  }, [navigate]);

  return (
    <div>
      <h1>Poengfordeling av personlighetstrekk for din organisasjon</h1>
      <div>
        <button onClick={() => setChartType('pie')}>Kakediagram</button>
        <button onClick={() => setChartType('bar')}>Stolpediagram</button>
      </div>
      <div className="chart-container">
        <ChartComponent data={chartData} chartType={chartType} />
      </div>
      <div>
        <p>Høyeste poengsum er: {highestScore}</p>
        <p>Laveste poengsum er: {lowestScore}</p>
        <textarea
          value={additionalInfo}
          readOnly
          placeholder="Lim inn ekstra informasjon her..."
        />
      </div>
    </div>
  );
};

export default OrgOverview;

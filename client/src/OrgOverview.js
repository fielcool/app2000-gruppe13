import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import { useNavigate } from 'react-router-dom';

const OrgOverview = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('bar'); // default to bar
  const [highestScore, setHighestScore] = useState('');
  const [highestScoreDomain, setHighestScoreDomain] = useState('');
  const [lowestScore, setLowestScore] = useState('');
  const [lowestScoreDomain, setLowestScoreDomain] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('- Nevrotisisme: Nevrotisisme omhandler tendensen til å oppleve negative følelser.');

  // Function to map single-letter domain codes to full words
  const mapDomainCodeToWord = (code) => {
    switch (code) {
      case 'N':
        return 'Nevrotisisme';
      case 'E':
        return 'Ekstroversjon';
      case 'O':
        return 'Åpenhet for erfaringer';
      case 'A':
        return 'Medmenneskelighet';
      case 'C':
        return 'Planmessighet';
      default:
        return code;
    }
  };

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

        // Find domains associated with highest and lowest scores
        const highestScoreItem = response.data.find(item => item.score === maxScore);
        const lowestScoreItem = response.data.find(item => item.score === minScore);
        if (highestScoreItem) {
          setHighestScoreDomain(mapDomainCodeToWord(highestScoreItem.domain));
        }
        if (lowestScoreItem) {
          setLowestScoreDomain(mapDomainCodeToWord(lowestScoreItem.domain));
        }

        // Calculate percentages of total score
        const totalScore = scores.reduce((acc, score) => acc + score, 0);
        const highestScorePercentage = (maxScore / totalScore) * 100;
        const lowestScorePercentage = (minScore / totalScore) * 100;

        // Set additional info including percentages
        setAdditionalInfo(`- Nevrotisisme: Nevrotisisme omhandler tendensen til å oppleve negative følelser.\n\nHøyeste poengsum (${highestScore}) tilhører domenet ${highestScoreDomain} og utgjør ${highestScorePercentage.toFixed(2)}% av totalen.\nLaveste poengsum (${lowestScore}) tilhører domenet ${lowestScoreDomain} og utgjør ${lowestScorePercentage.toFixed(2)}% av totalen.`);
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
        <p>Høyeste poengsum er: {highestScore} ({highestScoreDomain})</p>
        <p>Laveste poengsum er: {lowestScore} ({lowestScoreDomain})</p>
        <p>{additionalInfo}</p>
      </div>
    </div>
  );
};

export default OrgOverview;

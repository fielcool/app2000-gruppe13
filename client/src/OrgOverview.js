import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Decimal from 'decimal.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrgOverview = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('bar'); // Default chart type
  const [highestScore, setHighestScore] = useState('');
  const [highestScoreDomain, setHighestScoreDomain] = useState('');
  const [lowestScore, setLowestScore] = useState('');
  const [lowestScoreDomain, setLowestScoreDomain] = useState('');
  const [percentageHigh, setPercentageHigh] = useState(0);
  const [percentageLow, setPercentageLow] = useState(0);


  // Function to map single-letter domain codes to full words for better readability
  const mapDomainCodeToWord = (code) => {
    switch (code) {
      case 'N': return 'Nevrotisisme';
      case 'E': return 'Ekstroversjon';
      case 'O': return 'Åpenhet for erfaringer';
      case 'A': return 'Medmenneskelighet';
      case 'C': return 'Planmessighet';
      default: return code;
    }
  };
  // Function to format percentages
  const calculatePercentage = (value, total) => {
    const percentage = new Decimal(value).div(new Decimal(total)).mul(100);
    return percentage.toDecimalPlaces(2).toString();  // Ensuring precise calculation and rounding to 2 decimal places
  };

  useEffect(() => {
    // Asynchronous function to fetch chart data from the API
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

        // Calculate highest and lowest scores along with their percentages
        const scores = response.data.map(item => item.score);
        const maxScore = Math.max(...scores);
        const minScore = Math.min(...scores);
        const totalScore = scores.reduce((acc, curr) => acc + curr, 0);
        setHighestScore(maxScore);
        setLowestScore(minScore);

        setPercentageHigh(calculatePercentage(maxScore, totalScore));
        setPercentageLow(calculatePercentage(minScore, totalScore));

        // Associate domains with scores
        const highestScoreItem = response.data.find(item => new Decimal(item.score).equals(maxScore));
        const lowestScoreItem = response.data.find(item => new Decimal(item.score).equals(minScore));
        if (highestScoreItem) setHighestScoreDomain(mapDomainCodeToWord(highestScoreItem.domain));
        if (lowestScoreItem) setLowestScoreDomain(mapDomainCodeToWord(lowestScoreItem.domain));
      } catch (error) {
        console.error('Error fetching chart data:', error);
        navigate('/error'); // Navigate to error page on failure
      }
    };

    fetchChartData();
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="org-container">
        <h1>Poengfordeling av personlighetstrekk for din organisasjon</h1>
        <div>
          <button onClick={() => setChartType('pie')} className="btn btn-info btn-md fp-button shadow-custom">Kakediagram</button>
          <button onClick={() => setChartType('bar')} className="btn btn-info btn-md fp-button shadow-custom">Stolpediagram</button>
        </div>
        <div className="chart-container">
          <ChartComponent data={chartData} chartType={chartType} />
        </div>
        <div className="text-container">
          <h3>Sterkeste og svakeste organisasjonstrekk</h3>
          <p1>Sterkeste samlede personlighetstrekk er {highestScoreDomain} med {highestScore} poeng
          <br /> Dette tilsvarer {percentageHigh}% av totalscoren.
          <br />
          Svakeste samlede personlighetstrekk er {lowestScoreDomain} med {lowestScore} poeng
          <br /> Dette tilsvarer {percentageLow}% av totalscoren
          <br />
          <br />
          Differansen mellom sterkeste og svakeste personlighetstrekk er derfor {displayPercentage(percentageHigh - percentageLow)}%  </p1>
          <br />
          <hr />
          {/* Include other personality trait descriptions here */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrgOverview;

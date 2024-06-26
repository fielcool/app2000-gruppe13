// This component displays various personality traits scores for an organization using dynamic chart visualizations.
// It fetches and calculates the highest and lowest scores, displaying them along with detailed descriptions of personality traits.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
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

  // Function to format percentages
  const displayPercentage = (percentage) => {
    return Number(percentage).toFixed(2);
  };

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

        //display difference in scores as percentage - try to compensate for floating-point arithmetic issues in JavaScript
        setPercentageHigh(displayPercentage((maxScore / totalScore) * 100));
        setPercentageLow(displayPercentage((minScore / totalScore) * 100));

        // Associate domains with scores
        const highestScoreItem = response.data.find(item => item.score === maxScore);
        const lowestScoreItem = response.data.find(item => item.score === minScore);
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
          <h2>Nevrotisisme</h2>
          <p>Beskriver tendens til å oppleve slike negative følelser også uten at det nødvendigvis har skjedd noe konkret som utløser slike følelser.I motsatt ende finner vi de som har sterkere tendens til å tåle stress og usikkerhet uten sterk bekymring og engstelse. Er forbundet med å tåle presset i lederrollen.</p>
          <h2>Ekstroversjon</h2>
          <p>Tendens til å være “sosialt anlagt” og å oppsøke/skape muligheter for følelsesmessig stimulerende aktiviteter. Er forbundet med endringsorientert og relasjonsorientert ledelse. Introversjon (i andre enden) beskriver at man har mindre behov for dette. </p>
          <h2>Åpenhet for erfaringer</h2>
          <p>Tilbøyelighet til fantasi, å søke nye opplevelser, å ha et liberalt syn på livet. Er forbundet med endringsorientert ledelse.  I “den andre enden” finner vi tendens til å foretrekke regler, systemer, at man er mer praktisk orientert og konservativt anlagt.</p>
          <h2>Medmenneskelighet</h2>
          <p>Tilbøyelighet til å ville glede og hjelpe andre, man er menneskekjærlig anlagt og empatisk av natur. Er forbundet med relasjonsorientert ledelse. I motsatt ende finner man mer egennyttige, “tøffere”, konkurranseorienterte mennesker som er opptatt av å få ting på sin måte. </p>
          <h2>Planmessighet</h2>
          <p>Beskriver tendens til å være målorientert, pliktoppfyllende, grundig og gjennomtenkt. Er forbundet med styrende og oppgaveorientert ledelse. I andre enden av dette trekket finner vi folk som er mer tilbakelente og mindre “ordnede”. 
            </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrgOverview;

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
        <h2>Nevrotisisme</h2>
        <p>Beskriver tendens til å oppleve slike negative følelser også uten at det nødvendigvis har skjedd noe konkret som utløser slike følelser.I motsatt ende finner vi de som har sterkere tendens til å tåle stress og usikkerhet uten sterk bekymring og engstelse. Er forbundet med å tåle presset i lederrollen.</p>
        <h2>Ekstroversjon</h2>
        <p>Tendens til å være “sosialt anlagt” og å oppsøke/skape muligheter for følelsesmessig stimulerende aktiviteter. Er forbundet med endringsorientert og relasjonsorientert ledelse. Introversjon (i andre enden) beskriver at man har mindre behov for dette. </p>
        <h2>Åpenhet for erfaringer</h2>
        <p>Tilbøyelighet til fantasi, å søke nye opplevelser, å ha et liberalt syn på livet. Er forbundet med endringsorientert ledelse.  I “den andre enden” finner vi tendens til å foretrekke regler, systemer, at man er mer praktisk orientert og konservativt anlagt.</p>
        <h2>Medmenneskelighet</h2>
        <p>Tilbøyelighet til å ville glede og hjelpe andre, man er menneskekjærlig anlagt og empatisk av natur. Er forbundet med relasjonsorientert ledelse. I motsatt ende finner man mer egennyttige, “tøffere”, konkurranseorienterte mennesker som er opptatt av å få ting på sin måte. </p>
        <h2>Planmessighet</h2>
        <p>Beskriver tendens til å være målorientert, pliktoppfyllende, grundig og gjennomtenkt. Er forbundet med styrende og oppgaveorientert ledelse. I andre enden av dette trekket finner vi folk som er mer tilbakelente og mindre “ordnede”. </p>

      </div>
    </div>
  );
};

export default OrgOverview;

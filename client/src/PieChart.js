import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      // Assuming data is directly an array of numbers [N, E, O, A, C]
      // If data comes in as objects or needs transformation you would handle it here
      // For example:
      // const chartData = data.map(item => item.score); // Transform if data is [{domain: 'N', score: 10}, ...]

      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Neuroticism', 'Extraversion', 'Openness to Experience', 'Agreeableness', 'Conscientiousness'],
          datasets: [{
            label: 'Domain Scores',
            data: data,  // Use chartData if transformed
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          }
        }
      });
    } else {
      console.log('No data available for PieChart');
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default PieChart;

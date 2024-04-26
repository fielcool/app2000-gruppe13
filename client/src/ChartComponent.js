import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ data, chartType }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      if (window.myChart instanceof Chart) {
        window.myChart.destroy(); // Destroy the existing chart before creating a new one
      }
      window.myChart = new Chart(ctx, {
        type: chartType, // 'pie' or 'bar'
        data: {
          labels: data.map(item => item.domain), // ['N', 'E', 'O', 'A', 'C']
          datasets: [{
            label: chartType === 'pie' ? 'Domain Scores' : 'Scores by Domain',
            data: data.map(item => item.score),
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
              position: chartType === 'pie' ? 'top' : 'right'
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          }
        }
      });
    }
  }, [data, chartType]); // Re-run the effect if data or chartType changes

  return <canvas ref={chartRef} />;
};

export default ChartComponent;

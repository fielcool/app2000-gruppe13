import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ data, chartType }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    if (window.myChart instanceof Chart) {
        window.myChart.destroy(); // Destroy any existing chart instance before creating a new one
    }
    window.myChart = new Chart(ctx, {
      type: chartType,
      data: {
        labels: data.map(item => item.domain), 
        datasets: [{
          label: `${chartType} of Scores`,
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
            position: 'top',
          },
        }
      }
    });

    return () => {
      if (window.myChart instanceof Chart) {
        window.myChart.destroy(); // Clean up chart when the component unmounts
      }
    };
  }, [data, chartType]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;

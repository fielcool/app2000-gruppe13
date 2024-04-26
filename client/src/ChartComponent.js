import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ data, chartType }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    let chartInstance = window.myChart;

    if (chartInstance) {
      chartInstance.destroy(); // Destroy the existing chart before creating a new one
    }
    chartInstance = new Chart(ctx, {
      type: chartType, // 'pie' or 'bar'
      data: {
        labels: ['Nevrotisme', 'Ekstroversjon', 'Åpenhet for erfaringer', 'Medmennesklighet', 'Planmessighet'],
        datasets: [{
          label: chartType === 'pie' ? 'Poeng' : 'Poeng',
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
            position: chartType === 'pie' ? 'top' : false,
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        }
      }
    });

    // Ensure we clean up on component unmount
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data, chartType]);

  return (
    <div className="container p-3">
      <div className="card">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ChartComponent;

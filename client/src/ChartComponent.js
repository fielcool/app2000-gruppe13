// ChartComponent.js
// This component renders dynamic charts based on the provided data and chart type.
// It supports both 'pie' and 'bar' charts for visualizing personality traits scores.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ data, chartType }) => {
  // Ref for the canvas element where the chart will be rendered
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    let chartInstance = window.myChart;

    // Check and destroy existing chart instance if exists
    if (chartInstance) {
      chartInstance.destroy(); // Destroy the existing chart before creating a new one
    }

    // Create a new chart instance
    chartInstance = new Chart(ctx, {
      type: chartType, // Determines the chart type (e.g., 'pie' or 'bar')
      data: {
        labels: ['Nevrotisme', 'Ekstroversjon', 'Åpenhet for erfaringer', 'Medmenneskelighet', 'Planmessighet'],
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

    // Cleanup function for component unmount
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data, chartType]); // Dependency array ensures effect runs only when data or chart type changes

  return (
    <div className="container p-3">
      <div className="card">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ChartComponent;

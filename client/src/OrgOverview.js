import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PieChart from './PieChart';
import axios from 'axios';

const OrgOverview = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChartData = async () => {
        setIsLoading(true);
        setError('');
        try {
          const authToken = localStorage.getItem('authToken');
          if (!authToken) {
            throw new Error('Authentication required');
          }
      
          const response = await axios.get('/api/pieChart', {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          });
          setChartData(response.data);
        } catch (error) {
          console.error('Error fetching pie chart data:', error);
          setError('Failed to fetch chart data');
          navigate('/LoggedInUser');
        } finally {
          setIsLoading(false);
        }
      };
      

    fetchChartData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="org-overview">
      <h1>Org Overview</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="danger" onClick={handleLogout}>Logout</Button>
      <div className="pie-chart-container">
        {isLoading ? <p>Loading...</p> : <PieChart data={chartData} />}
      </div>
    </div>
  );
};

export default OrgOverview;

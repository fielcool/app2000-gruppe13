/*

const express = require('express');
const router = express.Router();
const TestResult = require('../models/TestResult');
const { protect } = require('../middleware');

// Route to aggregate test scores and generate pie chart data
router.get('/pieChart', protect, async (req, res) => {
  try {
    const organization = req.user.organization;

    // Aggregate test scores for users within the organization
    const aggregateScores = await TestResult.aggregate([
      {
        $match: { organization } // Filter by organization
      },
      {
        $group: {
          _id: '$domain',
          totalScore: { $sum: '$score' } // Aggregate scores for each domain
        }
      }
    ]);

    // Format aggregated scores into data suitable for a pie chart
    const pieChartData = aggregateScores.map(score => ({
      domain: score._id,
      score: score.totalScore
    }));

    res.status(200).json(pieChartData);
  } catch (error) {
    console.error('Error generating pie chart data:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
*/
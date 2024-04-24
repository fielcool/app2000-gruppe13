const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const TestResult = require('../models/TestResult');
const { verifyToken } = require('../LogInTokens');

// Route to aggregate test scores and generate pie chart data
router.get('/pieChart', verifyToken, async (req, res) => {
  try {
    const organisasjon = req.user.organisasjon;

    // Log the organization for debugging
    console.log('Organization:', organisasjon);

    // Aggregate test scores for the organization
    const aggregateScores = await User.aggregate([
      {
        $match: { organisasjon: organisasjon } // Filter by organization
      },
      {
        $lookup: {
          from: "testResults",
          localField: "testId",
          foreignField: "_id",
          as: "testResults"
        }
      },
      {
        $unwind: "$testResults" // Unwind the array of test results
      },
      {
        $group: {
          _id: "$testResults.domain",
          totalScore: { $sum: "$testResults.score" }
        }
      }
    ]);

    // Log the aggregated scores for debugging
    console.log('Aggregate Scores:', aggregateScores);

    // Format aggregated scores into data suitable for a pie chart
    const pieChartData = aggregateScores.map(score => ({
      domain: score._id,
      score: score.totalScore
    }));

    // Log the formatted pie chart data for debugging
    console.log('Pie Chart Data:', pieChartData);

    // Respond with the formatted pie chart data
    res.status(200).json(pieChartData);
  } catch (error) {
    console.error('Error generating pie chart data:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;

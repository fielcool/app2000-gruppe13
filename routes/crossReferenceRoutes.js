const express = require('express');
const router = express.Router();
const { connection1, connection2 } = require('../database'); // Import the database connections
const { verifyToken } = require('../LogInTokens');
const UserModel = require('../models/UserModel');
const TestResult = require('../models/TestResult');


// Route to aggregate test scores and generate pie chart data
router.get('/pieChart', verifyToken, async (req, res) => {
  try {
    const organisasjon = req.user.organisasjon;

    // Retrieve data from the 'brukere' database (connection1)
    const User = connection1.model('User', UserModel);

    // Retrieve data from the 'results' collection (connection2)
    const TestResultModel = connection2.model('TestResult', TestResult);

    // Perform aggregation
    const aggregateScores = await User.aggregate([
      {
        $match: { organisasjon: organisasjon } // Filter by organization
      },
      {
        $lookup: {
          from: TestResultModel.collection.name,
          localField: "resultatId",
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

    // Respond with the formatted pie chart data
    res.status(200).json(pieChartData);
  } catch (error) {
    console.error('Error generating pie chart data:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;

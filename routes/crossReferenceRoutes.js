const express = require('express');
const router = express.Router();
const { connection1, connection2 } = require('../database'); // Import the database connections
const { verifyToken } = require('../LogInTokens');
const userSchema = require('../models/UserSchema');
const testResultSchema = require('../models/TestResult');

router.get('/pieChart', verifyToken, async (req, res) => {
  try {
    const organisasjon = req.user.organisasjon;
    console.log('Organisation:', organisasjon);

    // Define models using the respective connections
    const User = connection1.models.User || connection1.model('User', userSchema);
    const TestResultModel = connection2.models.TestResult || connection2.model('TestResult', testResultSchema);

    console.log('Checking database connections...');
    console.log('User model ready:', !!User);
    console.log('TestResultModel ready:', !!TestResultModel);

    // Fetch users for initial data verification
    const users = await User.find({ organisasjon: organisasjon });
    console.log('Users found:', users.length);

    // Proceed with the aggregation if users are found
    const aggregateScores = await User.aggregate([
      {
          $match: { organisasjon: organisasjon }
      },
      {
          $lookup: {
              from: "results",
              localField: "resultatId",
              foreignField: "_id",
              as: "testResults"
          }
      },
      {
          $unwind: "$testResults"
      },
      {
          $unwind: "$testResults.answers"
      },
      {
          $group: {
              _id: "$testResults.answers.domain",
              totalScore: { $sum: "$testResults.answers.score" }
          }
      },
      {
          $sort: { _id: 1 }
      }
    ]);

    console.log('TestResult Lookup Results:', JSON.stringify(aggregateScores));

    if (!aggregateScores.length) {
        console.log('No data found for the given organisation');
        return res.status(404).json({ error: 'No data found' });
    }

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

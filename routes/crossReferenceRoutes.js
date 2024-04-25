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

      const aggregateScores = await User.aggregate([
        {
            $match: { organisasjon: organisasjon } // Filter users by organization
        },
        {
            $lookup: {
                from: results, // This needs to match the actual collection name in the database
                localField: "resultatId",
                foreignField: "_id",
                as: "testResults"
            }
        },
        {
            $unwind: "$testResults" // Prepare the result for further processing
        },
        {
            $unwind: "$testResults.answers" // Unwind answers to access individual score items
        },
        {
            $group: {
                _id: "$testResults.answers.domain", // Group results by domain
                totalScore: { $sum: "$testResults.answers.score" } // Sum up scores within the same domain
            }
        },
        {
            $sort: { _id: 1 } // Optionally sort by domain alphabetically
        }
      ]);

      console.log('Aggregate Scores:', aggregateScores);

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

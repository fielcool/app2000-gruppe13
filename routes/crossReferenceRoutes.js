const express = require('express');
const router = express.Router();
const { connection1, connection2 } = require('../database'); // Import the database connections
const { verifyToken } = require('../LogInTokens');
const User = connection1.model('User', require('../models/UserSchema')); // Corrected User model reference
const TestResultModel = connection2.model('TestResult', require('../models/TestResult'));

router.get('/pieChart', verifyToken, async (req, res) => {
    try {
        const organisasjon = req.user.organisasjon;
        console.log('Organisation:', organisasjon);

        // Assuming you have confirmed that 'results' is the correct collection name
        const aggregateScores = await User.aggregate([
            {
                $match: { organisasjon: organisasjon }
            },
            {
                $lookup: {
                    from: "results", // Ensure this is the correct collection name
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

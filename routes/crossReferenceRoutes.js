const express = require('express');
const router = express.Router();
const { connection1 } = require('../database'); // Assuming TestResult is already correctly configured and exported
const { verifyToken } = require('../LogInTokens');
const User = require('../models/UserSchema'); // Assuming direct import of models
const TestResult = require('../models/TestResult');

router.get('/pieChart', verifyToken, async (req, res) => {
    try {
        const organisasjon = req.user.organisasjon;

        // Fetch users for initial data verification
        const users = await User.find({ organisasjon: organisasjon });
        if (!users.length) {
            return res.status(404).json({ error: 'No users found' });
        }

        // Fetch Test Results using users' resultatId
        const testResults = await Promise.all(users.map(user =>
            TestResult.findById(user.resultatId)
        ));

        const validResults = testResults.filter(result => result);

        if (!validResults.length) {
            return res.status(404).json({ error: 'No test results found' });
        }

        // Process Results to create Pie Chart Data
        const domainScores = validResults.reduce((acc, result) => {
            result.answers.forEach(answer => {
                acc[answer.domain] = (acc[answer.domain] || 0) + answer.score;
            });
            return acc;
        }, {});

        const pieChartData = Object.keys(domainScores).map(domain => ({
            domain,
            score: domainScores[domain]
        }));

        res.status(200).json(pieChartData);
    } catch (error) {
        console.error('Error generating pie chart data:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

module.exports = router;

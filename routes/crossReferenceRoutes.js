const express = require('express');
const router = express.Router();
const { connection1 } = require('../database'); // Import the database connection
const { verifyToken } = require('../LogInTokens');
const User = require('../models/UserSchema'); // Import User model
const TestResult = require('../models/TestResult'); // Import TestResult model

router.get('/pieChart', verifyToken, async (req, res) => {
    try {
        const organisasjon = req.user.organisasjon;
        console.log('Organisation:', organisasjon);

        // Fetch users for initial data verification
        const users = await User.find({ organisasjon: organisasjon });
        console.log('Users found:', users.length);

        if (!users.length) {
            console.log('No users found for the given organisation');
            return res.status(404).json({ error: 'No users found' });
        }

        // Fetch Test Results using users' resultatId
        const testResults = await Promise.all(users.map(user => {
            console.log('Fetching result for ID:', user.resultatId);
            return TestResult.findById(user.resultatId).then(result => {
                console.log('Result for ID:', user.resultatId, result ? 'Found' : 'Not Found');
                return result;
            });
        }));

        // Filter out null results if any user's resultatId didn't have a matching TestResult
        const validResults = testResults.filter(result => result !== null);
        console.log('Valid test results found:', validResults.length);

        if (!validResults.length) {
            console.log('No test results found for the given users');
            return res.status(404).json({ error: 'No test results found' });
        }

        // Process Results to create Pie Chart Data
        const domainScores = validResults.reduce((acc, result) => {
            result.answers.forEach(answer => {
                acc[answer.domain] = (acc[answer.domain] || 0) + answer.score;
                console.log(`Accumulating scores: ${answer.domain} now has ${acc[answer.domain]}`);
            });
            return acc;
        }, {});

        const pieChartData = Object.keys(domainScores).map(domain => ({
            domain: domain,
            score: domainScores[domain]
        }));
        console.log('Pie chart data prepared:', pieChartData);

        res.status(200).json(pieChartData);
    } catch (error) {
        console.error('Error generating pie chart data:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { connection1, connection2 } = require('../database'); // Import the database connections
const { verifyToken } = require('../LogInTokens');
const userSchema = require('../models/UserSchema');
const testResult = require('../models/TestResult');

router.get('/pieChart', verifyToken, async (req, res) => {
    try {
        const organisasjon = req.user.organisasjon;
        console.log('Organisation:', organisasjon);

        // Define models using the respective connections
        const User = connection1.models.User || connection1.model('User', userSchema);
        const TestResult = connection2.models.TestResult || connection2.model('TestResult', testResult);

        console.log('Checking database connections...');
        console.log('User model ready:', !!User);
        console.log('TestResultModel ready:', !!TestResult);

        // Fetch users for initial data verification
        const users = await User.find({ organisasjon: organisasjon });
        console.log('Users found:', users.length);

        if (!users.length) {
            console.log('No users found for the given organisation');
            return res.status(404).json({ error: 'No users found' });
        }

        // Fetch Test Results from connection2 using users' resultatId
        const testResults = await Promise.all(
          users.map(user => {
              console.log('Fetching result for ID:', user.resultatId);
              return TestResult.findById(user.resultatId).then(result => {
                  console.log('Result for ID:', user.resultatId, result);
                  return result;
              });
          })
      );

        // Filter out null results if any user's resultatId didn't have a matching TestResult
        const validResults = testResults.filter(result => result !== null);

        if (!validResults.length) {
            console.log('No test results found for the given users');
            return res.status(404).json({ error: 'No test results found' });
        }

        // Process Results to create Pie Chart Data
        const domainScores = validResults.reduce((acc, result) => {
            result.answers.forEach(answer => {
                if (!acc[answer.domain]) {
                    acc[answer.domain] = 0;
                }
                acc[answer.domain] += answer.score;
            });
            return acc;
        }, {});

        const pieChartData = Object.keys(domainScores).map(domain => ({
            domain: domain,
            score: domainScores[domain]
        }));

        res.status(200).json(pieChartData);
    } catch (error) {
        console.error('Error generating pie chart data:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

module.exports = router;

// chart.js
// This module defines an Express router for fetching pie chart data based on test results associated with an organization.
// It integrates with two separate MongoDB connections for handling user and test result data.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

const express = require('express');
const router = express.Router();
const { connection1, connection2 } = require('../database'); // Import connections for user and test result data
const { verifyToken } = require('../LogInTokens'); // Middleware for JWT token verification
const testResultSchema = require('../models/TestResult'); // Import the schema for test results

// Route to get chart data for an organization
router.get('/chart', verifyToken, async (req, res) => {
    try {
        const organisasjon = req.user.organisasjon; // Extract organization from the verified user
        console.log('Organisation:', organisasjon);

        // Use existing models or initialize if they don't exist yet
        const User = connection1.models.User || connection1.model('User', userSchema);
        const TestResult = connection2.models.TestResult || connection2.model('TestResult', testResultSchema);

        console.log('Checking database connections...');
        console.log('User model ready:', !!User);
        console.log('TestResult model ready:', !!TestResult);

        // Fetch users for initial data verification
        const users = await User.find({ organisasjon: organisasjon });
        console.log('Users found:', users.length);

        if (!users.length) {
            console.log('No users found for the given organisation');
            return res.status(404).json({ error: 'No users found' });
        }

        // Fetch Test Results using users' resultatId from connection2
        const testResults = await Promise.all(users.map(user => {
            console.log('Fetching result for ID:', user.resultatId);
            return TestResult.findById(user.resultatId).then(result => {
                console.log('Result for ID:', user.resultatId, result ? 'Found' : 'Not Found');
                return result;
            });
        }));

        const validResults = testResults.filter(result => result);
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

        // Prepare the chart data from accumulated scores
        const chartData = Object.keys(domainScores).map(domain => ({
            domain: domain,
            score: domainScores[domain]
        }));
        console.log('Pie chart data prepared:', chartData);

        // Send the processed chart data as a response
        res.status(200).json(chartData);
    } catch (error) {
        console.error('Error generating pie chart data:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

module.exports = router;

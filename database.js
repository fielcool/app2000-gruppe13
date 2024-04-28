// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

const mongoose = require('mongoose');

/**
 * Establishes a MongoDB connection using Mongoose.
 * @param {string} uri - The MongoDB connection URI.
 * @param {object} options - Mongoose connection options.
 * @param {string} dbName - A descriptive name for the database connection, used for logging.
 * @returns {mongoose.Connection} A mongoose connection instance.
 */
function connectToDatabase(uri, options, dbName) {
    // Initialize a new Mongoose connection
    const connection = mongoose.createConnection(uri, options);
    
    // Log any connection errors
    connection.on('error', console.error.bind(console, `MongoDB Connection Error for ${dbName}:`));

    // Log successful connection
    connection.once('open', () => {
        console.log(`Database connected for ${dbName} at ${uri}`);
    });

    // Return the connection instance
    return connection;
}

// Define options for MongoDB connections
const options = {
    useNewUrlParser: true, // Use the new URL string parser from MongoDB driver
    useUnifiedTopology: true, // Use the new topology engine
};

// Connect to the 'brukere' (users) database
const connection1 = connectToDatabase(process.env.MONGODB_URI, options, 'brukere');

// Connect to the 'bigfive' database (usually for psychological test results)
const connection2 = connectToDatabase(process.env.MONGODB_URI_2, options, 'bigfive');

// Export the connections for use elsewhere in the application
module.exports = { connection1, connection2 };

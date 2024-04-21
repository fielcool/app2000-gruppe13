const mongoose = require('mongoose');

// Function to establish a database connection
function connectToDatabase(uri, options, dbName) {
    // Create a new database connection instance
    const connection = mongoose.createConnection(uri, options);
    
    // Event handling for the database connection
    connection.on('error', console.error.bind(console, `MongoDB Connection Error for ${dbName}:`));
    connection.once('open', () => {
        console.log(`Database connected for ${dbName} at ${uri}`);
    });

    return connection;
}

// Options for MongoDB connection
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Connect to the 'brukere' database
const connection1 = connectToDatabase(process.env.MONGODB_URI, options, 'brukere');

// Connect to the 'bigfive' database
const connection2 = connectToDatabase(process.env.MONGODB_URI_2, options, 'bigfive');

// Export the database connections
module.exports = { connection1, connection2 };

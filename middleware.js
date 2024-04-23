const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');

const appMiddleware = express.Router(); // Create a router instance

// Middleware
appMiddleware.use(cors());
appMiddleware.use(express.json());
appMiddleware.use(cookieParser());
appMiddleware.use(morgan("tiny"));

module.exports = appMiddleware;

const mongoose = require('mongoose');
const { connection2 } = require('../database'); 


const testResultSchema = new mongoose.Schema({
  testId: {
    type: String,
    required: true
  },
  lang: {
    type: String,
    required: true
  },
  invalid: {
    type: Boolean,
    required: true
  },
  answers: [{
    questionID: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    domain: {
      type: String,
      required: true
    },
    facet: {
      type: Number,
      required: true
    }
  }],
  timeElapsed: {
    type: Number,
    required: true
  },
  dateStamp: {
    type: Number,
    required: true
  }
}, { timestamps: true });



// Create the TestResult model using the connection2 instance
const TestResult = connection2.model('TestResult', testResultSchema);

// Export the TestResult model
module.exports = TestResult;

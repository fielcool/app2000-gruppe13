// models/TestResult.js

const mongoose = require('mongoose');

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
    default: false
  },
  answers: [
    {
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
    }
  ]
}, { timestamps: true });

const TestResult = mongoose.model('TestResult', testResultSchema);

module.exports = TestResult;

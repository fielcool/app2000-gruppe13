// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

const mongoose = require('mongoose');
const connection2 = require('../database').connection2;



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



// Export the TestResult model
module.exports = connection2.model('TestResult', testResultSchema, "results");

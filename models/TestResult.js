const mongoose = require('mongoose');
const { connection2 } = require('../database');

const testResultSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
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
  answers: {
    type: [
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
    ],
    required: true,
    validate: {
      validator: function(v) {
        return v.length === 120; 
      },
      message: props => `${props.value} is not a valid length for answers array.`
    }
  },
  timeElapsed: {
    type: Int32,
    required: true
  },
  dateStamp: {
    type: mongoose.Schema.Types.Double,
    required: true
  }
}, { timestamps: true });

const TestResult = connection2.model('TestResults', testResultSchema, 'results');

module.exports = TestResult;

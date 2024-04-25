const mongoose = require('mongoose');

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
    type: Number,
    required: true
  },
  dateStamp: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = testResultSchema;

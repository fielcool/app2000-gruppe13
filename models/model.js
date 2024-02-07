const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  data: Object,
  date: { type: Date, default: Date.now },
});

const Answer = new mongoose.model("Answer", answerSchema);

exports.Answer = Answer;

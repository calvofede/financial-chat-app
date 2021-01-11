const mongoose = require('mongoose');
const { Schema } = mongoose;

const message = new Schema({
  name:  String,
  message: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("message", message);

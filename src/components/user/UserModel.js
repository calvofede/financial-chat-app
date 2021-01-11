const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new Schema({
  name:  String,
  password: String,
  email: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", user);
const mongoose = require('mongoose');

const specialEventSchema = new mongoose.Schema({
  name: String,
  description: String,
  Teacher: String,
});

module.exports = mongoose.model('SpecialEvent', specialEventSchema,'specialevents');

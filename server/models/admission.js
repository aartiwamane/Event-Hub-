const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  education: String,
  address: String,
  aadhaar: String,
  batch: String,
  fees: Number,
  eventId: String,
  eventName: String,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Admission', admissionSchema);

const mongoose = require('mongoose');

const WorkingHoursSchema = new mongoose.Schema({
  daysOfweek: {
    type: String,
    //required: true
  },
  openingAt: {
    type: String,
    //required: true
  },
  closingAt: {
    type: String,
    //required: true
  },
  pauseStart: {
    type: String,
    //required: true
  },
  pauseEnd: {
    type: String,
    //required: true
  },
  business: {
    type: mongoose.Schema.ObjectId,
    ref: 'Business'
    //required: true
  }
  
});

module.exports = WorkingHoursSchema;

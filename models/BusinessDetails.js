const mongoose = require('mongoose');

const BusinessDetailsSchema = new mongoose.Schema({
  acceptsCreditCard: {
    type: Number,
    required: true
  },
  acceptsReservations: {
    type: Number,
    required: true
  },
  delivers: {
    type: Number,
    required: true
  },
  offersTakeout: {
    type: Number,
    required: true
  },
  freeWifi: {
    type: Number,
    required: true
  },
  outDoorSeating: {
    type: Number,
    required: true
  },
  driveThrough: {
    type: Number,
    required: true
  },
  priceRange: {
    type: Number,
    required: true
  }
});

// Static method to get avg stars
/* BusinessSchema.statics.getAverageStars = async function() */

 module.exports = BusinessDetailsSchema; 
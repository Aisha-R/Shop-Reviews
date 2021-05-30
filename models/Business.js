const mongoose = require('mongoose');
const BusinessDetails = require('./BusinessDetails');
const WorkingHoursSchema = require('./WorkingHours');

const BusinessSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    //required: [true, 'Please add title']
  },
  description: {
    type: String,
    //required: [true, 'Please add description']
  },
  category: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  postCode: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  webSite: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  reviewCount: {
    type: Number,
    required: true
  },
  photos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Photo',
      required: true
    }
  ],
  workingHours: 
    WorkingHoursSchema,
  /* reviews: [
    {
    }
  ], */
  details: 
    BusinessDetails, 
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  averageStars: {
    type: String,
    required: false
  }
});

// Static method to get avg stars
/* BusinessSchema.statics.getAverageStars = async function() */


module.exports = mongoose.model('Business', BusinessSchema);
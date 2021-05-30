const mongoose = require('mongoose');
const BusinessDetails = require('./BusinessDetails');
const WorkingHoursSchema = require('./WorkingHours');
const PhotoSchema = require('./Photo');
const ReviewSchema = require('./Review')

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
  photos: 
    PhotoSchema,
  workingHours: 
    WorkingHoursSchema,
  reviews:
    ReviewSchema,
  user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }, 
  details: 
    BusinessDetails,
  averageStars: {
    type: String,
    required: false
  }
});

// Static method to get avg stars
/* BusinessSchema.statics.getAverageStars = async function() */


module.exports = mongoose.model('Business', BusinessSchema);
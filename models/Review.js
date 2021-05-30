const mongoose = require('mongoose');
const LanguageSchema = require('./Language');
const PhotoSchema = require('./Photo');

const ReviewSchema = new mongoose.Schema({
  reviewText: {
    type: String,
    //required: true
    //required: [true, 'Please add some text']
  },
  stars: {
    type: Number,
    min: 1,
    max: 5,
    required: true
    //required: [true, 'Please add rating between 1 and 5']
  },
  reviewDate: {
    type: Date,
    default: Date.now
  },
  likeCount: {
    type: Number,
    required: true
  },
  photos: 
      PhotoSchema,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    //required: true
  },
  business: {
    type: mongoose.Schema.ObjectId,
    ref: 'Business',
    //required: true
  }, 
   language: 
      LanguageSchema
});

// Prevent user from making more than one review per Business

// Static method to get average stars and save

module.exports = ReviewSchema;

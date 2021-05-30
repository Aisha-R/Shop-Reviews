const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  photoUrl: {
    type: String,
    //required: true
    //required: [true, 'Please add some text']
  },
  addedDate: {
    type: Date,
    default: Date.now(),
    required: true
    //required: [true, 'Please add rating between 1 and 5']
  },
  reviewDate: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  business: {
    type: mongoose.Schema.ObjectId,
    ref: 'Business',
    //required: true
  },
  review: {
    type: mongoose.Schema.ObjectId,
    ref: 'Review',
    //required: true
  }  
});

// Prevent user from making more than one review per Business

// Static method to get average stars and save

module.exports = PhotoSchema;
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  numberOfReviews: {
    type: Number,
  },
  numberOfLikes: {
    type: Number,
  },
  numberOfPhotos: {
    type: Number,
  }

});

module.exports = mongoose.model('User', UserSchema);

 


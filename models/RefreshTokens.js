const mongoose = require('mongoose');

const RefreshToken = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true
  }
  
});

module.exports = mongoose.model('RefreshToken', RefreshToken);
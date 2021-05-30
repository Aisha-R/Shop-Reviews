const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema(
  {
    languageName: {
      type: String,
      required: true
    }
  }
);
 
module.exports = LanguageSchema;
const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: '.env'});

// Load models
const Review = require('./models/Review');
const User = require('./models/User');
const Business = require('./models/Business');
const BusinessDetails = require('./models/BusinessDetails');
const Photo = require('./models/Photo');
const Language = require('./models/Language');
const WorkingHours = require('./models/WorkingHours');
const RefreshTokens = require('./models/RefreshTokens');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/db/reviews.json`, 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/db/users.json`, 'utf-8')
);

const businesses = JSON.parse(
  fs.readFileSync(`${__dirname}/db/businesses.json`, 'utf-8')
);

const businessDetails = JSON.parse(
  fs.readFileSync(`${__dirname}/db/business_details.json`, 'utf-8')
);

const languages = JSON.parse(
  fs.readFileSync(`${__dirname}/db/languages.json`, 'utf-8')
);

const photos = JSON.parse(
  fs.readFileSync(`${__dirname}/db/photos.json`, 'utf-8')
);

const workingHours = JSON.parse(
  fs.readFileSync(`${__dirname}/db/working_hours.json`, 'utf-8')
);

const refreshTokens = JSON.parse(
  fs.readFileSync(`${__dirname}/db/refresh_tokens.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Review.create(reviews);
    await User.create(users);
    await Business.create(businesses);
    //await BusinessDetails.create(businessDetails);
    //await Language.create(languages);
    //await Photo.create(photos);
    //await WorkingHours.create(workingHours);
    await RefreshTokens.create(refreshTokens);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Review.deleteMany();
    await User.deleteMany();
    await Business.deleteMany(); 
    //await BusinessDetails.deleteMany();
    //await Photo.deleteMany();
    //await WorkingHours.deleteMany();
    //await Language.deleteMany();
    await RefreshTokens.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}


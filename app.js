require('dotenv').config();

const express = require('express');
const colors = require('colors');
const connectDB = require('./config/mongodb.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Load env vars
require('dotenv').config();

// Connect to database
connectDB();

// Route files
const businessRoute = require('./routes/business.js');
app.use(businessRoute);

const reviewsRoute = require('./routes/reviews.js');
app.use(reviewsRoute);

const usersRoute = require('./routes/users.js');
app.use(usersRoute);

// swagger docs route
app.use('/api-docs', require('./config/swagger.js'));

// Mount routers
app.use(businessRoute);
app.use(reviewsRoute);
app.use(usersRoute);

const PORT = process.env.PORT ? process.env.PORT : 3000;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
    console.log(`Server is listening on port ${PORT}`.yellow.bold);
    }
});

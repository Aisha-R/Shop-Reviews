require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: false
});

connection.connect( (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Connected to the MySQL Server.");
    }
});



// swagger docs route
app.use('/api-docs', require('./config/swagger.js'));

const { Model } = require('objection');
const KnexLibrary = require('knex');
const knexFile = require('./knexfile.js');
const knexConnection = KnexLibrary(knexFile.development);

Model.knex(knexConnection);

const businessRoute = require('./routes/business.js');
app.use(businessRoute);

const reviewsRoute = require('./routes/reviews.js');
app.use(reviewsRoute);

const usersRoute = require('./routes/users.js');
app.use(usersRoute);

const PORT = process.env.PORT ? process.env.PORT : 3000;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
    console.log(`Server is listening on port ${PORT}`);
    }
});

require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const credentials = require('./config/mySQLCredentials.js')

const connection = mysql.createConnection({
    host: 'localhost',
    user: credentials.user,
    password: credentials.password,
    database: credentials.database
});

connection.connect( (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Connected to the MySQL Server.");
    }
});

const businessRoute = require('./routes/business.js');
app.use(businessRoute);

const reviewsRoute = require('./routes/reviews.js');
app.use(reviewsRoute);

const usersRoute = require('./routes/users.js');
app.use(usersRoute);

const { Model } = require('objection');
const KnexLibrary = require('knex');
const knexFile = require('./knexfile.js');
const knexConnection = KnexLibrary(knexFile.development);

Model.knex(knexConnection);

const PORT = process.env.PORT ? process.env.PORT : 3000;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
    console.log(`Server is listening on port ${PORT}`);
    }
});
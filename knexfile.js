const credentials = require('./config/mySQLCredentials');

module.exports = {

    development: {

        client: 'mysql',
        connection: {
            user: credentials.user,
            password: credentials.password,
            database: credentials.database
        }
    }

}
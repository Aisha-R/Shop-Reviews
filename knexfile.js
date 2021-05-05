const credentials = require('./config/mySQLCredentials');

//const { knexSnakeCaseMappers } = require('objection');

module.exports = {

    development: {

        client: 'mysql',
        connection: {
            user: credentials.user,
            password: credentials.password,
            database: credentials.database
        }/*,
        ...knexSnakeCaseMappers()*/
    }

}
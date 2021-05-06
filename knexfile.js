module.exports = {

    development: {

        client: 'mysql',
        connection: {
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        }
    }

}
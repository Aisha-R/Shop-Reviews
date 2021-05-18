const { Model } = require('objection');

class User extends Model {

    static get tableName() {
        return 'user';
    }

    static get jsonSchema() {
        return {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'password'],
          properties: {
            id: { type: 'integer' },
            firstName: { type: 'string', minLength: 1, maxLength: 50 },
            lastName: { type: 'string', minLength: 1, maxLength: 50 },
            profilePicture: { type: 'string', minLength: 1, maxLength: 200 },
            password: { type: 'string', minLength: 1, maxLength: 200 },
            email: { type: 'string', minLength: 1, maxLength: 50 },
            country: { type: 'string', minLength: 1, maxLength: 50 },
            city: { type: 'string', minLength: 1, maxLength: 50 }
          }
        };
    }

}

module.exports = User;

 


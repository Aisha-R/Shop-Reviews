const { Model } = require('objection');

class Business extends Model {

    static get tableName() {
        return 'business';
    }

    static get jsonSchema() {
        return {
          type: 'object',
          required: ['title', 'address', 'city', 'country', 'postCode', 'detailsID', 'userID'],
          properties: {
            id: { type: 'integer' },
            title: { type: 'string', minLength: 1, maxLength: 50 },
            description: { type: 'string', minLength: 1, maxLength: 200 },
            category: { type: 'string', minLength: 1, maxLength: 200 },
            address: { type: 'string', minLength: 1, maxLength: 100 },
            country: { type: 'string', minLength: 1, maxLength: 50 },
            city: { type: 'string', minLength: 1, maxLength: 50 },
            postCode: { type: 'string', minLength: 1, maxLength: 20 },
            phoneNumber: { type: 'string', minLength: 1, maxLength: 20 },
            webSite: { type: 'string', minLength: 1, maxLength: 50 },
            email: { type: 'string', minLength: 1, maxLength: 50 },
            detailsID: { type: 'integer' },
            userID: { type: 'integer' }
          }
        };
    }

}

module.exports = Business;
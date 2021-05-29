const { Model } = require('objection');

const Business = require('./Business.js');

class BusinessDetails extends Model {
    static get idColumn() {
        return 'ID';
    }
    static get tableName() {
        return 'business_details';
    }


}

module.exports = BusinessDetails;


const { Model } = require('objection');

class Business extends Model {

    static get tableName() {
        return 'business';
    }

}

module.exports = Business;
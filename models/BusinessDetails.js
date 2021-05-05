const { Model } = require('objection');

const Business = require('./Business.js');

class BusinessDetails extends Model {

    static get tableName() {
        return 'business_details';
    }
    
    static relationMappings = {
        business: {
            relation: Model.BelongsToOneRelation,
            modelClass: Business,
            join: {
                from: 'business_details.id',
                to: 'business.detailsID'
            }
        }
    }

}

module.exports = BusinessDetails;
const { Model } = require('objection');

class Language extends Model {

    static get tableName() {
        return 'language';
    }

}

module.exports = Language;
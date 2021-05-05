const { Model } = require('objection');

class Photo extends Model {

    static get tableName() {
        return 'photo';
    }

}

module.exports = Photo;
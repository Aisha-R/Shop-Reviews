const { Model } = require('objection');

class RefreshToken extends Model {

    static get tableName() {
        return 'refresh_tokens';
    }

}

module.exports = RefreshToken;
const Business = require("./Business");
const { Model } = require('objection');

class WorkingHours extends Model {

    static get tableName() {
        return 'working_hours';
    }



}

module.exports = WorkingHours;

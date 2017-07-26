const BaseData = require('./base/base.data');
const User = require('../models/user.model');

class SeedData extends BaseData {
    constructor(db) {
        super(db);
    }
}

module.exports = SeedData;

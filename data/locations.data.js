const BaseData = require('./base/base.data');
const Location = require('../models/location.model');

class LocationsData extends BaseData {
    constructor(db) {
        super(db, Location, Location);
    }

    _isModelValid(model) {
        // custom validation
        return super._isModelValid(model);
    }
}

module.exports = LocationsData;
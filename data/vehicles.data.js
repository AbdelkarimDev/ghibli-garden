const BaseData = require('./base/base.data');
const Vehicle = require('../models/vehicle.model');

class VehiclesData extends BaseData {
    constructor(db) {
        super(db, Vehicle, Vehicle);
    }

    _isModelValid(model) {
        // custom validation
        return super._isModelValid(model);
    }
}

module.exports = VehiclesData;

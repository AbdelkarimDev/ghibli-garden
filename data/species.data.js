const BaseData = require('./base/base.data');
const Species = require('../models/species.model');

class SpeciesData extends BaseData {
    constructor(db) {
        super(db, Species, Species);
    }

    _isModelValid(model) {
        // custom validation
        return super._isModelValid(model);
    }
}

module.exports = SpeciesData;

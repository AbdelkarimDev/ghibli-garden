const BaseData = require('./base/base.data');
const Film = require('../models/film.model');

class FilmsData extends BaseData {
    constructor(db) {
        super(db, Film, Film);
    }

    _isModelValid(model) {
        // custom validation
        return super._isModelValid(model);
    }
}

module.exports = FilmsData;

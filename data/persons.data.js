const BaseData = require('./base/base.data');
const Person = require('../models/person.model');

class PersonsData extends BaseData {
    constructor(db) {
        super(db, Person, Person);
    }

    _isModelValid(model) {
        // custom validation
        return super._isModelValid(model);
    }
}

module.exports = PersonsData;

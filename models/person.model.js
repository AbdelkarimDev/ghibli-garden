const BaseModel = require('./base.model');

class Person extends BaseModel {
    static get ITEMS() {
        return ['name', 'gender', 'age',
            'eye_color', 'hair_color', 'species'];
    }

    static get COLLECTIONS() {
        return ['films'];
    }

    static isValid(model) {
        if (typeof model !== 'object') {
            return false;
        }

        const items = Person.ITEMS;
        const collections = Person.COLLECTIONS;
        return Person._validateAll(model, items) &&
            Person._validateMinLength(model, 'name', 3) &&
            Person._validateCollection(model, collections);
    }

    toViewModel(model) {
        const viewModel = new Person();
        Person.ITEMS
            .concat(Person.COLLECTIONS)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Person;

const BaseModel = require('./base.model');

class Film extends BaseModel {
    static get ITEMS() {
        return ['title', 'description', 'director',
            'producer', 'release_date'];
    }

    static get COLLECTIONS() {
        return ['people', 'species', 'locations', 'vehicles'];
    }

    static isValid(model) {
        if (typeof model !== 'object') {
            return false;
        }

        const items = Film.ITEMS;
        const collections = Film.COLLECTIONS;
        return Film._validateAll(model, items) &&
            Film._validateMinLength(model, 'title', 3) &&
            Film._validateMinLength(model, 'description', 5) &&
            Film._validateCollection(model, collections);
    }

    static toViewModel(model) {
        const viewModel = new Film();
        Film.ITEMS
            .concat(Film.COLLECTIONS)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Film;

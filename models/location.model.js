const BaseModel = require('./base.model');

class Location extends BaseModel {
    static get ITEMS() {
        return ['name', 'climate', 'terrain', 'surface_water'];
    }

    static get COLLECTIONS() {
        return ['residents', 'films'];
    }

    static isValid(model) {
        if (typeof model !== 'object') {
            return false;
        }

        const items = Location.ITEMS;
        const collections = Location.COLLECTIONS;
        return Location._validateAll(model, items) &&
            Location._validateMinLength(model, 'name', 3) &&
            Location._validateCollection(model, collections);
    }

    static toViewModel(model) {
        const viewModel = new Location();
        Location.ITEMS
            .concat(Location.COLLECTIONS)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        viewModel.id = model._id;
        return viewModel;
    }
}

module.exports = Location;

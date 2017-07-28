const BaseModel = require('./base.model');

class Vehicle extends BaseModel {
    static get ITEMS() {
        return ['name', 'description', 'vehicle_class', 'length',
            'pilot', 'film'];
    }

    static get COLLECTIONS() {
        return [];
    }

    static isValid(model) {
        if (typeof model !== 'object') {
            return false;
        }

        const items = Vehicle.ITEMS;
        const collections = Vehicle.COLLECTIONS;
        return Vehicle._validateAll(model, items) &&
            Vehicle._validateMinLength(model, 'name', 3) &&
            Vehicle._validateCollection(model, collections);
    }

    toViewModel(model) {
        const viewModel = new Vehicle();
        Vehicle.ITEMS
            .concat(Vehicle.COLLECTIONS)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        viewModel.id = model._id;
        return viewModel;
    }
}

module.exports = Vehicle;

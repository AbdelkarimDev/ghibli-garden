const BaseModel = require('./base.model');

class Species extends BaseModel {
    static get ITEMS() {
        return ['name', 'classification', 'eye_colors',
            'hair_colors'];
    }

    static get COLLECTIONS() {
        return ['people', 'films'];
    }

    static isValid(model) {
        if (typeof model !== 'object') {
            return false;
        }

        const items = Species.ITEMS;
        const collections = Species.COLLECTIONS;
        return Species._validateAll(model, items) &&
            Species._validateMinLength(model, 'name', 3) &&
            Species._validateCollection(model, collections);
    }

    toViewModel(model) {
        const viewModel = new Species();
        Species.ITEMS
            .concat(Species.COLLECTIONS)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        viewModel.id = model._id;
        return viewModel;
    }
}

module.exports = Species;

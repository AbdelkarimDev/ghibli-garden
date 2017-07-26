const BaseModel = require('./base.model');

class User extends BaseModel {
    static get ITEMS() {
        return ['name', 'username', 'email'];
    }

    static get COLLECTIONS() {
        return [];
    }

    static isValid(model) {
        if (typeof model !== 'object') {
            return false;
        }

        const props = User.ITEMS;
        return User._validateAll(props) &&
            User._validateMinLength(model, 'username', 4);
    }

    toViewModel(model) {
        const viewModel = new User();
        User.ITEMS
            .concat(User.COLLECTIONS)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = User;

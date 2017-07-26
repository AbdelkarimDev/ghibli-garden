const BaseModel = require('./base.model');

class User extends BaseModel {
    static isValid(model) {
        if (typeof model !== 'object') {
            return false;
        }

        const props = ['name', 'email', 'username', 'password'];
        return User._validateAll(props) &&
            User._validateMinLength(model, 'username', 4) &&
            User._validateMinLength(model, 'password', 6);
    }

    static toViewModel(model) {
        const viewModel = new User();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = User;

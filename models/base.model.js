class BaseModel {
    static _validateAll(model, props) {
        let valid = true;

        for (const prop of props) {
            if (model[prop] === 'undefined' ||
                typeof model[prop] !== 'string') {
                valid = false;
                break;
            }
        }

        return valid;
    }

    static _validateMinLength(model, prop, len) {
        return model[prop].length > len;
    }

    static _validateCollection(model, collections) {
        let valid = true;

        for (const collection of collections) {
            const col = model[collection];
            if (!Array.isArray(col)) {
                valid = false;
                break;
            }
        }

        return valid;
    }

    get id() {
        return this._id;
    }
}

module.exports = BaseModel;

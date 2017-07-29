const { ObjectID } = require('mongodb');

class BaseMongoDbData {
    constructor(db, ModelClass, validator) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.validator = validator;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    filterBy(props) {
        return this.collection.find(props)
            .toArray()
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    getAll() {
        return this.collection.find()
            .toArray()
            .then((models) => {
                if (this.ModelClass.toViewModel) {
                    return models.map(
                        (model) => this.ModelClass.toViewModel(model)
                    );
                }

                return models;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    create(model) {
        if (!this._isModelValid(model)) {
            return Promise.reject('Validation failed!');
        }
        return this.collection.insert(model)
            .then(() => {
                return model;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    findById(id) {
        let objId;
        try {
            objId = new ObjectID(id);
        } catch (e) {
            return Promise.reject(e.message);
        }
        return this.collection.findOne({
            _id: objId,
        })
        .catch((err) => {
            return Promise.reject(err);
        });
    }

    findOrCreateBy(props) {
        return this.filterBy(props)
            .then(([model]) => {
                if (!model) {
                    model = {};
                    return this.collection.insert(model)
                        .then(() => {
                            return model;
                        });
                }

                return model;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    updateById(model) {
        if (!this._isModelValid(model)) {
            return Promise.reject('Validation failed!');
        }
        return this.collection.updateOne({
            _id: model._id,
        }, model)
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    findFirst(n) {
        return this.collection.find()
            .limit(+n)
            .toArray()
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    _isModelValid(model) {
        if ('undefined' === typeof this.validator ||
            'function' !== typeof this.validator.isValid) {
            return true;
        }

        return this.validator.isValid(model);
    }

    _getCollectionName() {
        const nameToLower = this.ModelClass.name.toLowerCase();
        if (nameToLower.endsWith('s')) {
            return nameToLower;
        }
        return nameToLower + 's';
    }
}

module.exports = BaseMongoDbData;


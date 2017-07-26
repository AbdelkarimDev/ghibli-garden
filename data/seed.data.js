const BaseData = require('./base/base.data');
const User = require('../models/user.model');

class SeedData extends BaseData {
    constructor(db) {
        super(db);
    }

    findByUsername(username) {
        return this
            .filterBy({ username: new RegExp(username, 'i') })
            .then(([user]) => user);
    }

    getPassword(username) {
        return this.findByUsername(username)
            .then((user) => {
                if (!user) {
                    throw new Error('Invalid user');
                }

                return user.password;
            });
    }
}

module.exports = SeedData;

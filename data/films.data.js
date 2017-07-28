const BaseData = require('./base/base.data');
const Film = require('../models/film.model');
const formatDate = require('../utils/datetime');

class FilmsData extends BaseData {
    constructor(db) {
        super(db, Film, Film);
    }

    _isModelValid(model) {
        // custom validation
        return super._isModelValid(model);
    }

    postComment(id, comment, username) {
        let filmToComment;
        const users = this.db.collection('users');
        this.findById(id)
            .then((film) => {
                if (!film) {
                    return Promise.reject('Comment failed');
                }
                return film;
            })
            .then((film) => {
                if (!film.comments) {
                    film.comments = [];
                }

                if (film.comments.length > 7) {
                    return Promise.reject('Maximum number of comments reached');
                }

                film.comments.push({
                    text: comment,
                    date: formatDate(new Date()),
                    user: username,
                });

                filmToComment = film;
                return users.findOne({
                    username: username,
                });
            })
            .then((user) => {
                const updateFilm = this.collection.updateOne(
                    { _id: id },
                    filmToComment
                );
                if (!user.comments) {
                    user.comments = [];
                }
                user.comments.push({
                    text: comment,
                    date: formatDate(new Date()),
                });

                const updateUser = users.updateOne(
                    { username: username },
                    user
                );

                return Promise.all([
                    updateFilm,
                    updateUser,
                ]);
            })
            .then((values) => {
                return Promise.resolve('Comment added successfully');
            })
            .catch((err) => {
                return Promise.reject('Sorry, failed to post ' +
                    'a comment');
            });
    }
}

module.exports = FilmsData;

const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);
    const utils = require('../../../utils/router-utils')(data);

    router
        .get('/', (req, res) => {
            return controller.getAll(req, res);
        })
        .get('/:id', (req, res) => {
            utils.validateUrlParam(req.params.id)
                .then(() => {
                    const id = req.params.id;
                    return controller.getById(req, res, id);
                })
                .catch((err) => {
                    req.flash('error', err);
                        return res.redirect('/');
                });
        })
        .get('/:id/comment', (req, res) => {
            utils.validateUrlParam(req.params.id)
                .then(() => {
                    const id = req.params.id;
                    if (!req.user) {
                        return Promise.resolve()
                            .then(() => {
                                req.flash(
                                    'error',
                                    'You need to be registered ' +
                                    'to post comments'
                                );

                                res.redirect('/auth/sign-in');
                            });
                    }
                    return data.films.findById(id)
                        .then((film) => {
                            if (!film) {
                                req.flash(
                                    'error',
                                    'No film with given ID exists'
                                );
                                res.redirect('/');
                            }
                            return film;
                        })
                        .then((film) => {
                            const action = `/${id}/comment`;
                            return res.render('comments/form', {
                                title: film.title,
                                action: action,
                            });
                        })
                        .catch((err) => {
                            return Promise.reject(err);
                        });
                })
                .catch((err) => {
                    req.flash('error', err);
                    return res.redirect('/');
                });
        })
        .post('/:id/comment', (req, res) => {
            utils.validateUrlParam(req.params.id)
                .then(() => {
                    if (!req.user) {
                        return Promise.resolve()
                            .then(() => {
                                req.flash(
                                    'error',
                                    'You need to be registered ' +
                                    'to post comments'
                                );

                                res.redirect('/auth/sign-in');
                            });
                    }

                    req.checkBody('comment', 'Comment cannot be empty')
                        .notEmpty();
                    req.sanitizeBody('comment').escape();
                    req.sanitizeBody('comment').trim();

                    // console.log(req.params.id);
                    // req.checkParams('id', 'Invalid url param').isAlpha();
                    // if (!req.params.id.match(/^[a-zA-Z0-9]*$/)) {
                    //     return res.render('home', 'Invalid url parameter');
                    // }
                    // req.sanitizeParams('id').toBoolean();

                    const errors = req.validationErrors();

                    if (errors) {
                        return res.render('home', {
                            errors: errors,
                        });
                    }
                    const comment = req.body.comment;
                    const id = req.params.id;
                    const username = req.user.username;
                    return controller.postComment(req, res, id,
                        comment, username);
                })
                .catch((err) => {
                    req.flash('error', err);
                    return res.redirect('/');
                });
        })
        .get('/:id/rate', (req, res) => {
            const id = req.params.id;
            if (!req.user) {
                return Promise.resolve()
                    .then(() => {
                        req.flash(
                            'error',
                            'You need to be registered ' +
                            'to rate films'
                        );

                        res.redirect('/auth/sign-in');
                    });
            }
            return data.films.findById(id)
                .then((film) => {
                    if (!film) {
                        req.flash(
                            'error',
                            'No film with given ID exists'
                        );
                        res.redirect('/');
                    }
                    return film;
                })
                .then((film) => {
                    const action = `/${id}/rate`;
                    return res.render('rating', {
                        title: film.title,
                        action: action,
                    });
                })
                .catch((err) => {
                    req.flash('error', err.message);
                    return res.redirect('/');
                });
        })
        .post('/:id/rate', (req, res) => {
            if (!req.user) {
                return Promise.resolve()
                    .then(() => {
                        req.flash(
                            'error',
                            'You need to be registered ' +
                            'to rate a film'
                        );

                        res.redirect('/auth/sign-in');
                    });
            }

            req.checkBody('rating', 'Cannot be empty').notEmpty();
            req.checkBody('rating', 'Has to be between 0 and 10')
                .matches(/^([0-9]|10)$/);
            req.sanitizeBody('rating').escape();
            req.sanitizeBody('rating').trim();

            const errors = req.validationErrors();
            if (errors) {
                return res.render('home', {
                    errors: errors,
                });
            }

            const rating = req.body.rating;
            const id = req.params.id;
            const username = req.user.username;
            return controller.rateFilm(req, res, id, rating, username);
        });

    app.use('/films', router);
};

module.exports = { attachTo };

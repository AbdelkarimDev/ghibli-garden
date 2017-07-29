const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/', (req, res) => {
            return controller.getAll(req, res);
        })
        .get('/:id', (req, res) => {
            const id = req.params.id;
            return controller.getById(req, res, id);
        })
        .get('/:id/comment', (req, res) => {
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
                    return res.render('comments', {
                        title: film.title,
                        action: action,
                    });
                })
                .catch((err) => {
                    req.flash('error', err.message);
                    return res.redirect('/');
                });
        })
        .post('/:id/comment', (req, res) => {
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
            const comment = req.body.comment;
            const id = req.params.id;
            const username = req.user.username;
            return controller.postComment(req, res, id, comment, username);
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

            const rating = req.body.rating;
            const id = req.params.id;
            const username = req.user.username;
            return controller.rateFilm(req, res, id, rating, username);
        });

    app.use('/films', router);
};

module.exports = { attachTo };

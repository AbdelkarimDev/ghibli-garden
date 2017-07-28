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
                            { message: 'No film with given ID exists' }
                        );
                        res.redirect('/');
                    }
                    return film;
                })
                .then((film) => {
                    const action = `/${id}/comment`;
                    // console.log(film);
                    // console.log(action);
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
            return data.films.postComment(id, comment, username)
                .then((msg) => {
                    req.flash('success', msg);
                    return res.redirect(`/films/${id}`);
                })
                .catch((err) => {
                    req.flash('error', err);
                    return res.redirect('/');
                });
        });
        // .post('/:id/rate', (req, res) => {
        //     const item = req.body;
        //
        //     // validate item
        //     return data.films.create(item)
        //         .then((dbItem) => {
        //             return res.redirect('/items');
        //         })
        //         .catch((err) => {
        //             // connect-flash
        //             req.flash('error', err);
        //             return res.redirect('/items/form');
        //         });
        // });

    app.use('/films', router);
};

module.exports = { attachTo };

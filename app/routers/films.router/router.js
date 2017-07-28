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
                            { message: 'You need authentication ' +
                            'to post comments' }
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
                    console.log(film);
                    console.log(action);
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
            const item = req.body;

            // validate item
            return data.films.create(item)
                .then((dbItem) => {
                    return res.redirect('/items');
                })
                .catch((err) => {
                    // connect-flash
                    req.flash('error', err);
                    return res.redirect('/items/form');
                });
        })
        .post('/:id/rate', (req, res) => {
            const item = req.body;

            // validate item
            return data.films.create(item)
                .then((dbItem) => {
                    return res.redirect('/items');
                })
                .catch((err) => {
                    // connect-flash
                    req.flash('error', err);
                    return res.redirect('/items/form');
                });
        });

    app.use('/films', router);
};

module.exports = { attachTo };

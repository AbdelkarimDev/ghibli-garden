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
            if (!req.user) {
                return Promise.resolve()
                    .then(() => {
                        req.flash(
                            'err',
                            { message: 'You need authentication ' +
                            'to post comments' }
                        );

                        res.redirect('/auth/sign-in');
                    });
            }
            return res.render('films/comment');
        })
        .get('/:id/rate', (req, res) => {
            if (!req.user) {
                return Promise.resolve()
                    .then(() => {
                        req.flash(
                            'err',
                            { message: 'You need authentication ' +
                            'to rate films' }
                        );

                        res.redirect('/auth/sign-in');
                    });
            }
            return res.render('films/rate');
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

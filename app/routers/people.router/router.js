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
        });
    app.use('/people', router);
};

module.exports = { attachTo };

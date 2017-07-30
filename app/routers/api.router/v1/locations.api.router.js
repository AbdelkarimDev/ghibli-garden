const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const utils = require('../../../../utils/router-utils')(data);

    router
        .get('/', (req, res) => {
            let pr;
            if (req.query.res) {
                pr = data.locations.findFirst(+req.query.res);
            } else {
                pr = data.locations.getAll();
            }

            return pr
                .then((location) => {
                    utils.sendPretty(res, location);
                })
                .catch((err) => {
                    return res
                        .status(500)
                        .send('Server error:' + err);
                });
        })
        .get('/:id', (req, res) => {
            utils.validateUrlParam(req.params.id)
                .then((id) => {
                    return data.locations.findById(id);
                })
                .then((film) => {
                    utils.sendPretty(res, film);
                })
                .catch((err) => {
                    return res
                        .status(500)
                        .send('Server error:' + err);
                });
        });

    app.use('/api/locations', router);
};

module.exports = { attachTo };

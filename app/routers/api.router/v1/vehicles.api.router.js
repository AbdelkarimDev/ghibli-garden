const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const utils = require('../../../../utils/router-utils')(data);

    router
        .get('/', (req, res) => {
            let pr;
            if (req.query.res) {
                pr = data.vehicles.findFirst(+req.query.res);
            } else {
                pr = data.vehicles.getAll();
            }

            return pr
                .then((vehicles) => {
                    utils.sendPretty(res, vehicles);
                })
                .catch((err) => {
                    return res
                        .status(500)
                        .send('Server error:' + err);
                });
        })
        .get('/:id', (req, res) => {
            utils.validateUrlParam(res, req.params.id)
                .then((id) => {
                    return data.vehicles.findById(id);
                })
                .then((vehicle) => {
                    utils.sendPretty(res, vehicle);
                })
                .catch((err) => {
                    return res
                        .status(500)
                        .send('Server error:' + err);
                });
        })
        .get('/:id/pilot', (req, res) => {
            utils.getSubcollection(req, res, 'vehicles', 'pilot');
        })
        .get('/:id/films', (req, res) => {
            utils.getSubcollection(req, res, 'vehicles', 'films');
        });

    app.use('/api/vehicles', router);
};

module.exports = { attachTo };

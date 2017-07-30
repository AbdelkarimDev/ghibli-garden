const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const utils = require('../../../../utils/router-utils')(data);

    router
        .get('/', (req, res) => {
            let pr;
            if (req.query.res) {
                pr = data.species.findFirst(+req.query.res);
            } else {
                pr = data.species.getAll();
            }

            return pr
                .then((species) => {
                    utils.sendPretty(res, species);
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
                    return data.species.findById(id);
                })
                .then((species) => {
                    utils.sendPretty(res, species);
                })
                .catch((err) => {
                    return res
                        .status(500)
                        .send('Server error:' + err);
                });
        })
        .get('/:id/people', (req, res) => {
            utils.getSubcollection(req, res, 'species', 'people');
        })
        .get('/:id/films', (req, res) => {
            utils.getSubcollection(req, res, 'species', 'films');
        });

    app.use('/api/species', router);
};

module.exports = { attachTo };

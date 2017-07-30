const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const utils = require('../../../../utils/router-utils')(data);

    router
        .get('/', (req, res) => {
            let pr;
            if (req.query.res) {
                pr = data.films.findFirst(+req.query.res);
            } else {
                pr = data.films.getAll();
            }

            return pr
                .then((films) => {
                    utils.sendPretty(res, films);
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
                    return data.films.findById(id);
                })
                .then((film) => {
                    utils.sendPretty(res, film);
                })
                .catch((err) => {
                    return res
                        .status(500)
                        .send('Server error:' + err);
                });
        })
        .get('/:id/people', (req, res) => {
            utils.getSubcollection(req, res, 'films', 'people');
        })
        .get('/:id/species', (req, res) => {
            utils.getSubcollection(req, res, 'films', 'species');
        })
        .get('/:id/locations', (req, res) => {
            utils.getSubcollection(req, res, 'films', 'locations');
        })
        .get('/:id/vehicles', (req, res) => {
            utils.getSubcollection(req, res, 'films', 'vehicles');
        })
        .get('/:id/comments', (req, res) => {
            utils.getSubcollection(req, res, 'films', 'comments');
        });

    app.use('/api/films', router);
};

module.exports = { attachTo };

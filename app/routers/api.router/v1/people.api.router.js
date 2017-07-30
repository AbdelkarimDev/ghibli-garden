const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const utils = require('../../../../utils/router-utils')(data);

    router
        .get('/', (req, res) => {
            let pr;
            if (req.query.res) {
                pr = data.persons.findFirst(+req.query.res);
            } else {
                pr = data.persons.getAll();
            }

            return pr
                .then((people) => {
                    utils.sendPretty(res, people);
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
                    return data.persons.findById(id);
                })
                .then((person) => {
                    utils.sendPretty(res, person);
                })
                .catch((err) => {
                    return res
                        .status(500)
                        .send('Server error:' + err);
                });
        })
        .get('/:id/films', (req, res) => {
            utils.getSubcollection(req, res, 'persons', 'films');
        })
        .get('/:id/species', (req, res) => {
            utils.getSubcollection(req, res, 'persons', 'species');
        });

    app.use('/api/people', router);
};

module.exports = { attachTo };

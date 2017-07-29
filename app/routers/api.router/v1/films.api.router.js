const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const utils = require('../../../../utils/router-utils')(data);
    // const sendPretty = (res, obj) => {
    //     res.setHeader('Content-Type', 'application/json');
    //     res.send(JSON.stringify(obj, null, 3));
    // };
    // const validateUrlParam = (res, id) => {
    //     if (!id.match(/^[a-zA-Z0-9]*$/)) {
    //              res
    //             .status(400)
    //             .send('Invalid url parameter');
    //     }
    //
    //     return Promise.resolve(id);
    // };
    // const getSubcollection = (req, res, sub) => {
    //     validateUrlParam(res, req.params.id)
    //         .then((id) => {
    //             return data.films.findById(id);
    //         })
    //         .then((film) => {
    //             sendPretty(res, film[sub]);
    //         })
    //         .catch((err) => {
    //             return res
    //                 .status(500)
    //                 .send('Server error:' + err);
    //         });
    // };

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
            utils.validateUrlParam(res, req.params.id)
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
        });

    app.use('/api/films', router);
};

module.exports = { attachTo };

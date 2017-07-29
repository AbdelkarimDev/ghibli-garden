const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const sendPretty = (res, obj) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(obj, null, 3));
    };

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
                    sendPretty(res, films);
                })
                .catch((err) => {
                    return res
                        .status(500)
                        .send('Server error:' + err);
                });
        })
        .get('/:id', (req, res) => {
            const id = req.params.id;
            if (!req.params.id.match(/[a-z0-9]+/i)) {
                return res
                    .status(400)
                    .send('Invalid url parameter');
            }
            return data.films.findById(id)
                .then((film) => {
                    sendPretty(res, film);
                })
                .catch((err) => {
                    return res
                        .status(500)
                        .send('Server error:' + err);
                });
        });
        // .get('/films/:id/people', (req, res) => {
        //     const id = req.params.id;
        //     if (!req.params.id.match(/[a-z0-9]+/i)) {
        //         return res
        //             .status(400)
        //             .send('Invalid url parameter');
        //     }
        //     return data.films.findById(id)
        //         .then((film) => {
        //             sendPretty(film);
        //         })
        //         .catch((err) => {
        //             return res
        //                 .status(500)
        //                 .send('Server error:' + err);
        //         });
        // });


    app.use('/api/films', router);
};

module.exports = { attachTo };

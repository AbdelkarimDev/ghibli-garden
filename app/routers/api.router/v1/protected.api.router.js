const { Router } = require('express');
const jwt = require('jsonwebtoken');

const attachTo = (app, data) => {
    const router = new Router();
    const utils = require('../../../../utils/router-utils')(data);
    // to Utils
    const ensureToken = (req, res, next) => {
        const bearerHeader = req.headers.authorization;
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else {
            res.sendStatus(403);
        }
    };

    router
        .get('/', (req, res) => {
            res.send('<strong>Ghibli API ---> /api/login for ' +
                'the protected endpoints</strong>');
        })
        .get('/login', (req, res) => {
            res.render('auth/api-form');
        })
        .post('/login', (req, res) => {
            req.sanitizeBody('username').escape();
            req.sanitizeBody('password').escape();
            if (req.body.username !== 'Pesho' ||
                req.body.password !== 'Pesho') {
                return res.send('Sorry, unable to login');
            }

            const user = {
                username: 'Pesho',
                password: 'Pesho',
            };
            const token = jwt.sign({ user }, 'spirited-away');
            // store token in localStorage
            return res.json({
                token: token,
            });
        })
        .get('/comments', ensureToken, (req, res) => {
            jwt.verify(req.token, 'spirited-away', (err, verData) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    data.films.collection.find()
                        .toArray()
                        .then((films) => {
                            const allComments = [];
                            films.forEach((x) => {
                                const current = {};
                                current.name = x.title || 'no title';
                                current.comments = x.comments || 'no comments';
                                allComments.push(current);
                            });
                            return allComments;
                        })
                        .then((all) => {
                            utils.sendPretty(res, all);
                        })
                        .catch((error) => {
                            res.sendStatus(500);
                        });
                }
            });
        });

    app.use('/api/', router);
};

module.exports = { attachTo };

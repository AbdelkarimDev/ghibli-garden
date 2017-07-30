const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            return res.render('chat');
        });

    app.use('/chat', router);
};

module.exports = { attachTo };

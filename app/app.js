const express = require('express');

const init = (data) => {
    const app = express();

    require('./config').applyTo(app);
    require('./auth').applyTo(app, data);
    require('./routers')
        .attachTo(app, data);
    return Promise.resolve(app);
};

module.exports = {
    init,
};

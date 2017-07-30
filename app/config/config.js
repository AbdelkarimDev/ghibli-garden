/* globals __dirname */

const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const morgan = require('morgan');
const fs = require('fs');

const applyTo = (app) => {
    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const libsPath = path.join(__dirname, '../../node_modules/');
    app.use('/libs', express.static(libsPath));

    const staticsPath = path.join(__dirname, '../../static');
    app.use('/static', express.static(staticsPath));

    app.use(cookieParser('princess mononoke'));

    app.use(flash());
    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });

    const accessLogStream = fs.createWriteStream(
        path.join(__dirname, '../../access.log'),
        { flags: 'a' });
    app.use(morgan('combined', { stream: accessLogStream }));

    app.use(expressValidator({
        errorFormatter: (param, msg, value) => {
            const namespace = param.split('.');
            const root = namespace.shift();
            let formParam = root;

            while (namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param: formParam,
                msg: msg,
                value: value,
            };
        },
    }));

    app.get('*', (req, res, next) => {
        res.locals.user = req.user || null;
        next();
    });
};

module.exports = { applyTo };

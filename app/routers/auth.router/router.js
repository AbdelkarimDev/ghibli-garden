const { Router } = require('express');
const passport = require('passport');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/sign-up', (req, res) => {
            return controller.getSignUpForm(req, res);
        })
        .get('/sign-in', (req, res) => {
            return controller.getSignInForm(req, res);
        })
        .get('/sign-out', (req, res) => {
            return controller.signOut(req, res);
        })
        .post('/sign-up', (req, res) => {
            return controller.signUp(req, res);
        })
        .post('/sign-in', (req, res, next) => {
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/auth/sign-in',
                failureFlash: true,
                successFlash: 'You are logged in!',
            })(req, res, next);
        });

    app.use('/auth', router);
};

module.exports = { attachTo };

// Questions
// how to choose category
// where and how to update the category

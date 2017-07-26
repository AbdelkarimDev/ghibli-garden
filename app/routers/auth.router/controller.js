const bcrypt = require('bcryptjs');

class TodosController {
    constructor(data) {
        this.data = data;
    }

    getSignUpForm(req, res) {
        return res.render('auth/sign-up');
    }

    getSignInForm(req, res) {
        return res.render('auth/sign-in');
    }

    signOut(req, res) {
        req.logout();
        req.flash('success', 'You are logged out');
        return res.redirect('/auth/sign-in');
    }

    signUp(req, res) {
        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password2', 'Password is required').notEmpty();

        req.sanitizeBody('name').escape();
        req.sanitizeBody('email').escape();
        req.sanitizeBody('username').escape();
        req.sanitizeBody('password').escape();
        req.sanitizeBody('password2').escape();

        req.sanitizeBody('name').trim();
        req.sanitizeBody('email').trim();
        req.sanitizeBody('username').trim();
        req.sanitizeBody('password').trim();
        req.sanitizeBody('password2').trim();

        req.checkBody('username', 'Invalid username length')
            .matches(/^([a-zA-Z0-9_-]){4,30}$/);
        req.checkBody('password', 'Invalid password length')
            .matches(/^([a-zA-Z0-9_-]){6,30}$/);
        req.checkBody('password2', 'Passwords do not match')
            .equals(req.body.password);
        req.checkBody('email', 'Email is not valid').isEmail();

        const errors = req.validationErrors();

        if (errors) {
            res.render('auth/sign-up', {
                errors: errors,
            });
        } else {
            const bodyUser = req.body;
            const username = bodyUser.username;
            const password = bodyUser.password;
            this.data.users.findByUsername(username)
                .then((dbUser) => {
                    if (dbUser) {
                        throw new Error('User already exists');
                    }
                })
                .then(() => {
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) {
                            throw new Error('Unable to register user, ' +
                                'server error');
                        }

                        bcrypt.hash(password, salt, (err2, hash) => {
                            if (err2) {
                                throw new Error('Unable to register user, ' +
                                    'server error');
                            }

                            bodyUser.password = hash;
                            delete bodyUser.password2;
                            return this.data.users.create(bodyUser);
                        });
                    });
                })
                .then(() => {
                    req.flash('success',
                        'You are now registered and can log in');
                    return res.redirect('/auth/sign-in');
                })
                .catch((err) => {
                    req.flash('error', err.message);
                });
        }
    }
}

const init = (data) => {
    return new TodosController(data);
};

module.exports = { init };

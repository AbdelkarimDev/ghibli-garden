const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-local');
const MongoStore = require('connect-mongo')(session);
const bcrypt = require('bcryptjs');

const config = require('../../config');

const applyTo = (app, data) => {
    passport.use(new Strategy((username, password, done) => {
        data.users.getPassword(username)
            .then((userPassword) => {
                bcrypt.compare(password, userPassword, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return username;
                    }

                    return done(null, false, { message: 'Wrong password' });
                });
            })
            .then((userName) => {
                return data.users.findByUsername(userName);
            })
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(null, false, { message: err });
            });
    }));

    app.use(session({
        store: new MongoStore({ url: config.connectionString }),
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        data.users.findById(id)
            .then((user) => {
                done(null, user);
            }).catch(done);
    });

    app.use((req, res, next) => {
        if (res.locals) {
            res.locals.user = req.user;
        } else {
            res.locals = {
                user: req.user,
            };
        }

        next();
    });
};

module.exports = { applyTo };

const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../components/user/UserModel');
const dal = require('../components/Dal')
const { findUserByEmail } = dal;

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            findUserByEmail(email)
                .then((user) => {
                    if (!user) {
                        return done(null, false);
                    }
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    })
                })
                .catch((err) => { console.error(err) })
        })

    )
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}; 
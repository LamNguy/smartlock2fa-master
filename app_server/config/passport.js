var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      if (err) done(err);
      else done(null, user);
    });
  });

  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {

        console.log('[User]\n' + user);

        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Invalid username.' });
        if (!user.validatePassword(password))
          return done(null, false, { message: 'Invalid password.' });

        user.password = null;
        console.log('authed');
        done(null, user);
      });
    })
  );
};

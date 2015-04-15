var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');


Park = mongoose.model('Park');

//gets called when student logs in
module.exports = function(passport) {

  //Set up new student profile

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    done(null, id);
  });

  passport.use('login', new LocalStrategy(
    function(username, password, done) {
      Park.findOne({ username: username}, function(err, user){
        if(err) { return done(err);}
        if(!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if(user.password != password){
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));
}
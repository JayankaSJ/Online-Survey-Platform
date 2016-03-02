var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoose = require("mongoose");

var User = mongoose.model("surveycreator");
var Administrator = mongoose.model("administrator");

passport.use('surveycreator', new LocalStrategy(
  function(email, password, done) {
    console.error(email);
    User.findOne({
      email: email
    }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, {
          message: "Incorrect username."
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      return done(null, user);
    });
  }
));

passport.use('administrator', new LocalStrategy(
  function(name, password, done) {
    Administrator.findOne({
      name : name
    }, function(err, administrator) {
        console.log(administrator);
      if (err) {
        return done(err);
      }

      if (!administrator) {
        return done(null, false, {
          message: "Incorrect username."
        });
      }
      if (!administrator.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      return done(null, administrator);
    });
  }
));
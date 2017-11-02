// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
const passport = require('passport')
const mongoose = require('mongoose');

// Define the Passport configuration method
module.exports = function() {
  // Load the 'User' model
  var User = mongoose.model('User');

  // Use Passport's 'serializeUser' method to serialize the user id
  passport.serializeUser(function(user, done) {
    console.log('serializing user for:', user.id)
    done(null, user.id);
  });

  // Use Passport's 'deserializeUser' method to load the user document
  // `'-password -salt'` is the field options argument to make sure Mongoose doesn't fetch the user's password and salt properties
  passport.deserializeUser(function(id, done) {
    console.log('deserializing user for:', id)
    User.findOne({
      _id: id
    }, '-password -salt', function(err, user) {
      done(err, user);
    });
  });

  // Load Passport's strategies configuration files
  require('./strategies/local.js')();
  // require('./strategies/twitter.js')();
  // require('./strategies/facebook.js')();
  // require('./strategies/google.js')();
};

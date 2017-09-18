'use strict'

const mongoose = require('mongoose')
const crypto = require('crypto')
const Schema = mongoose.Schema

// Defind a new 'UserSchema'
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    // Validate the mail format
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  username: {
    type: String,
    // Set a unique 'usename' index
    unique: true,
    // Validate 'username' value existance
    required: 'Username is required',
    // Trim the 'username' field
    trim: true
  },
  password: {
    type: String,
    // Validate the 'password' value length
    validate: [
      function (password) {
        return password && password.length > 6
      },
      'Password length should not less than 6'
    ],
  },
  salt: {
    type: String
  },
  provider: {
    type: String,
    // Validate 'provider' value existance
    // required: 'Provider is required'
  },
  providerId: String,
  providerDate: {},
  created: {
    type: Date,
    // Create a default 'created' value
    default: Date.now
  },
  addresses: Array,
})

// Set the 'fullname' virtual property
UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName
}).set(function (fullName) {
  var splitName = fullName.split(' ')
  this.firstName = splitName[0] || ''
  this.lastName = splitName[1] || ''
})

// Use  a pre-save middleware to hash the password
UserSchema.pre('save', function(next) {
  if (this.password) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64')
    // Q: this.hashPassword() ??
    // A: See below
    this.password = this.hashPassword(this.password)
  }

  next()
})

// Create an instance method for hashing a password
UserSchema.methods.hashPassword = function(password) {
  // Q: crypto.pbkdf2Sync() ??
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha1').toString('base64')
}

// Create an instance method for authenticating
UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password)
}

// Find possible not used username
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var _this = this;

  // Add a 'username' suffix
  var possibleUsername = username + (suffix || '');

  // Use the 'User' model 'findOne' method to find an available unique username
  _this.findOne({
    username: possibleUsername
  }, function(err, user) {
    // If an error occurs call the callback with a null value, otherwise find find an available unique username
    if (!err) {
      // If an available unique username was found call the callback method, otherwise call the 'findUniqueUsername' method again with a new suffix
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});


// Create the 'User' model out of the 'UserSchema'
module.exports = mongoose.model('User', UserSchema);

'use strict'

const passport = require('passport')

const User = require('mongoose').model('User')

exports.create = function(req, res, next) {
  console.log('new request come in to **Create** user:', req.body)

  const user = new User(req.body)

  user.save((err) => {
    if (err) {
      return next(err)
    } else {
      console.log('user create:', user)
      res.status(200).json(user)
    }
  })
}

exports.list = function(req, res, next) {
  User.find({}, (err, users) => {
    if (err) {
      return next(err)
    } else {
      res.status(200).json(users)
    }
  })
}

exports.userById = function(req, res, next, id) {
  User.findOne({
    _id: id
  }, (err, user) => {
    if (err) {
      return next(err)
    } else {
      req.user = user
      next()
    }
  })
}

//
// or use a helper function
//

// const getUserByid = function(id) {}
// exports.read = function(req, res, next) {
//   const user = getUserByid(req.params['userId'])
//   res.status(200).json(req.user)
// }

exports.read = function(req, res, next) {
  res.json(req.user)
}

exports.update = function(req, res, next) {
  User.findByIdAndUpdate(req.user.id, req.body, {
    'new': true
  }, (err, user) => {
    if (err) {
      return next(err)
    } else {
      res.status(200).json(user)
    }
  })
}

exports.delete = function(req, res, next) {
  req.user.remove(err => {
    if (err) {
      return next(err)
    } else {
      res.status(200).json(req.user)
    }
  })
}

// Create a new error handling controller method
var getErrorMessage = function(err) {
  // Define the error message variable
  var message = '';

  // If an internal MongoDB error occurs get the error message
  if (err.code) {
    switch (err.code) {
      // If a unique index error occurs set the message error
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      // If a general error occurs set the message error
      default:
        message = 'Something went wrong';
    }
  } else {
    // Grab the first error message from a list of possible errors
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  // Return the message error
  return message;
};

exports.renderSignup = function(req, res, next) {
  res.redirect('/signup.html')
}

exports.renderSignin = function(req, res, next) {
  res.redirect('/signin.html')
}

// Create a new controller method that creates new 'regular' users
exports.signup = function(req, res, next) {
  // If user is not connected, create and login a new user, otherwise redirect the user back to the main application page

  console.log('logged in user now is:', req.user && req.user.username)
  if (!req.user) {
    // Create a new 'User' model instance
    var user = new User(req.body);
    var message = null;

    console.log('new user registered:', user)

    // Set the user provider property
    user.provider = 'local';

    // Try saving the new user document
    user.save(function(err) {
      // If an error occurs, use flash messages to report the error
      if (err) {
        // Use the error handling method to get the error message
        message = getErrorMessage(err);

        // Set the flash messages
        req.flash('error', message);

        // Redirect the user back to the signup page
        return res.redirect('/signup');
      }

      // If the user was created successfully use the Passport 'login' method to login

      console.log('[login...]')

      req.login(user, function(err) {
        // If a login error occurs move to the next middleware
        if (err) return next(err);

        // Redirect the user back to the main application page

        // return res.redirect('/');

        console.log('> login successfully!')
        let rst = {id: req.user._id, username: req.user.username}
        console.log('res for client:', rst)
        res.json(rst)
      });
    });
  } else {
    return res.redirect('/');
  }
};

exports.signin = function() {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
  })
}

// Create a new controller method for signing out
exports.signout = function(req, res) {
  console.log('%s signout', req.user && req.user.username)
  // Use the Passport 'logout' method to logout
  req.logout();

  // Redirect the user back to the main application page
  res.redirect('/');
};

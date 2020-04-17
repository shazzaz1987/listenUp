var express = require('express')
var router = express.Router()
var User = require('../models/user')
var passport = require('passport')
var flash = require('connect-flash')

function authCheck (req, res, next) {
  // if req.isAuthenticated is false, then let it be

  // if it's true, redirect back to profile

  if (req.isAuthenticated()) {
    return res.redirect('/articles')
  } else {
    return next()
  }
}

//SIGNUP ROUTE
router.route('/signup')
  .get(authCheck, function (req, res) {
    User.find({}, function (err) {
      if (err) {
        console.log(err)
      } else {
        res.render('users/signup', {message: req.flash('signupMessage')})
      }
    })
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/articles',
    failureRedirect: '/signup',
    failureFlash: true
  }))

//LOGIN ROUTE
router.route('/login')
  .get(authCheck, function (req, res) {
    User.find({}, function (err) {
      if (err) {
        console.log(err)
      } else {
        res.render('users/signin', {message: req.flash('loginMessage')})
      }
    })
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/articles',
    failureRedirect: '/login',
    failureFlash: true
  }))

//LOGOUT ROUTE
router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/login')
})

module.exports = router

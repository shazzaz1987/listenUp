var express = require('express')
var router = express.Router()
var comment = require('../models/comment')
var Article = require('../models/article')
var passport = require('passport')
var flash = require('connect-flash')

function itsAuthenticated (req, res, next) {
  if (req.isAuthenticated()) { return next() }
  res.redirect('/login')
}
//NEW COMMENT
router.route('/:id/new-comment')
      .get(itsAuthenticated, function (req, res) {
        Article.findById(req.params.id, function (err, article) {
          if (err) {
            console.log(err)
          } else {
            res.render('comments/new', {article: article})
          }
        })
      })
      .post(function (req, res) {
        Article.findByIdAndUpdate(req.params.id,
          {$push: {comment: req.body.comment}}, function (err) {
            if (err) throw new Error(err)
              // console.log(article)
            res.redirect('/articles')
          })
      })

//REMOVE COMMENT
router.route('/articles/:id/remove-comment')
     .get(itsAuthenticated, function (req, res) {
       Article.findById(req.params.id, function (err, article) {
         if (err) {
           console.log(err)
         } else {
           res.render('/articles/soloart', {article: article})
         }
       })
     })
      .post(function (req, res, comment) {
        Article.findByIdAndUpdate(req.params.id, {$pop: {comment: req.body.comment}}, function (err) {
          if (err) {
            console.log(err)
          } else {
            res.redirect('/articles')
          }
        })
      })
//EDIT COMMENT
/*
router.route('/articles/:id/edit-comment')
     .get(function (req, res) {
       Article.findById(req.params.id, function (err, article) {
         if (err) {
           console.log(err)
         } else {
           res.render('/comments/edit_comment', {article: article})
         }
       })
     })
      .post(function (req, res, comment) {
        Article.findByIdAndUpdate(req.params.id, {$set: {comment: req.body.comment}}, function (err) {
          if (err) {
            console.log(err)
          } else {
            res.redirect('/articles')
          }
        })
      })
*/
module.exports = router

var express = require('express')
var router = express.Router()
var Article = require('../models/article')
var passport = require('passport')
var flash = require('connect-flash')

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) { return next() }
  res.redirect('/login')
}

//ARTICLE MAIN PAGE
router.route('/articles')
 .get(ensureAuthenticated, function (req, res) {
    Article.find({user: req.user.id}, function (err, allArticles) {
      if (err) {
       console.log(err)
     } else {
       res.render('articles/index', {allArticles: allArticles})
     }
   })
 })

//INDIVIDUAL ARTICLE PAGE
router.route('/articles/:id')
  .get(ensureAuthenticated, function (req, res) {
    Article.findById(req.params.id, function (err, article) {
      if (err) {
        console.log(err)
        res.redirect('/articles')
      } else {
        res.render('articles/soloart', {article: article})
      }
    })
  })

//POST NEW ARTICLE
router.route('/new-article')
  .get(ensureAuthenticated, function (req, res) {
    res.render('articles/new', {user: req.user})
  })
  .post(function (req, res) {
    Article.create(req.body.article, function (err) {
      if (err) {
        console.log(err)
      } else {
        res.redirect('articles')
      }
    })
  })

//EDIT ARTICLE
router.route('/articles/:id/edit')
  .get(ensureAuthenticated, function (req, res) {
    //res.render('./articles/edit-article')
    Article.findById(req.params.id, function (err, article) {
      if (err) {
         //res.flash('something wrong happened' + err)
        res.redirect('/articles')
      } else {
        res.render('articles/edit_article', {article: article})
      }
    })
  })
    .post(function (req, res) {
      Article.findByIdAndUpdate(req.params.id, { $set: {title: req.body.article.title, body: req.body.article.body} }, function (err, article) {
        if (err) {
          console.log(err)
          res.redirect('/articles')
        } else {
          res.redirect('/articles/:id')
        }
      })
    })

  //DELETE ARTICLE
router.route('/articles/:id/delete')
    .get(function (req, res) {
      Article.findByIdAndRemove(req.params.id, function (err) {
        if (!err) {
          res.redirect('/articles/:id')
        } else {
          res.send('post not deleted,click back')
        }
      })
    })

  //LOGOUT ROUTE
router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/login')
})

module.exports = router

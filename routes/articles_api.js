var express = require('express')
var router = express.Router()
var article = require('../models/article')

router.get('/articles', function (req, res) {
  article.find({}, function (err, allArticles) {
    res.json(allArticles)
  })
})

router.get('articles/:id', function (req, res) {
  // res.send('requested id is ' + req.params.id)
  article.findOne({ '_id': req.params.id }, function (err, user) {
    res.json(article)
  })
})

module.exports = router

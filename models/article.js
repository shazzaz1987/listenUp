var mongoose = require('mongoose')
var Schema = mongoose.Schema
var commentSchema = require('./comment')
var articleSchema = new Schema({
  title: String,
  body: String,
  comment: [commentSchema],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default:Date.now }
})

var Article = mongoose.model('Article', articleSchema)

module.exports = Article

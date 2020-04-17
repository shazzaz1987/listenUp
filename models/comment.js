var mongoose = require('mongoose')
var Schema = mongoose.Schema

var commentSchema = new Schema({
  title: String,
  author: String,
  body: String,
  date:{ type: Date, default:Date.now }
})

//var Comment = mongoose.model('Comment', commentSchema)

module.exports = commentSchema

const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = mongoose.model('UserMovie', Schema({
  tmdbId: String,
  username: String,
  isInWatchList: Boolean,
  userRating: String,
  notes: String
}))

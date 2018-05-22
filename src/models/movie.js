const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = mongoose.model('Movie', Schema({
  tmdbId: String,
  imdbId: String,
  name: String,
  releaseDate: String,
  image: String,
  duration: String,
  director: String,
  writers: String,
  cast: String,
  imdbRating: String,
  trailer: String,
  netflix: String,
  amazon: String,
}))

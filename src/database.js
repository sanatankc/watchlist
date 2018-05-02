const mongoose = require('mongoose')
const db = mongoose
require('dotenv').config()
const url = process.env.DB_URL

class Database {
  init() {
    db.connect(url)
    db.connection.on('open', () => {
      console.log('connection to database done!')
    })
    db.connection.on('error', e => {
        console.log(`error ${e}`)
    })
    const movies = mongoose.Schema({
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
    })

    this.URLModel = mongoose.model('movies', urlSchema);
  }
}
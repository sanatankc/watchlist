const mongoose = require('mongoose')
const db = mongoose
const getMovieDetails = require('./utils/getMovieDetails')
require('dotenv').config()

const url = process.env.DB_URL
class Database {
  init() {
    console.log(url)
    db.connect(url)
    db.connection.on('open', () => {
      console.log('connection to database done!')
    })
    db.connection.on('error', e => {
        console.log(`error ${e}`)
    })
    const movieSchema = mongoose.Schema({
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

    this.movieModel = mongoose.model('movies', movieSchema);
  }

  async addMovie(tmdbId, movieName) {
    console.log(tmdbId, movieName)
    const movieData = new this.movieModel(await getMovieDetails(tmdbId, movieName))
    console.log(movieData)
    await movieData.save()
      .then(err => {
        if (err) {
          console.error(err)
        }
      })
    return movieData
  }
}

const database = new Database()
database.init()

module.exports = database
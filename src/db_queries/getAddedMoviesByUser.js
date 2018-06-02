const UserMovie = require('../models/userMovie')
const Movie = require('../models/movie')

module.exports = async username => {
  const userMovie =  await UserMovie.find({ username })
  const filteredForTmdbId = userMovie.map(data => data.tmdbId)
  const movies = await Movie.find().where('tmdbId').in(filteredForTmdbId)
  return movies
}

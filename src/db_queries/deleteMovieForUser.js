const UserMovie = require('../models/userMovie')
const Movie = require('../models/movie')

module.exports = async (tmdbId, username) => {
  const movie = await Movie.findOne({ tmdbId }).exec()
  await UserMovie.findOneAndRemove({ tmdbId, username }).exec()
  return movie
}

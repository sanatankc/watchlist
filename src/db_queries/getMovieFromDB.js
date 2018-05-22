const Movie = require('../models/movie')

module.exports = async tmdbId => {
  const movie = await Movie.findOne()
    .where('tmdbId').equals(tmdbId)
    .exec()
  return movie
}

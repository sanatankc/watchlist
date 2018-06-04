const Movie = require('../models/movie')

const updateMovie = async (tmdbId, dataToUpdate) => {
  const updatedMovie = await Movie.findOneAndUpdate({ tmdbId }, dataToUpdate, {new: true}).exec()
  return updatedMovie
}

module.exports = updateMovie
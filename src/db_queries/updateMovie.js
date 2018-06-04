const Movie = require('../models/movie')
const getMovieFromDB = require('./getMovieFromDB')

const updateMovie = async (tmdbId, dataToUpdate) => {
  const movie = await getMovieFromDB(tmdbId)
  const updatedMovie = await Movie.findOneAndUpdate({ tmdbId }, dataToUpdate, {new: true}).exec()
  return updatedMovie
}

module.exports = updateMovie
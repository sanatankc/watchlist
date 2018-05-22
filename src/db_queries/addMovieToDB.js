const Movie = require('../models/movie')
const getMovieDetails = require('../utils/getMovieDetails')

module.exports = async (tmdbId, movieName) => {
  try {
    const movie = new Movie(await getMovieDetails(tmdbId, movieName))
    await movie.save()
    return movie
  } catch(e) {
    return null
  }
}

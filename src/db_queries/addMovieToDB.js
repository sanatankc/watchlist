const Movie = require('../models/movie')
const getMovieDetails = require('../utils/getMovieDetails')

module.exports = async (tmdbId, movieName) => {
  try {
    const movieDetails = await getMovieDetails(tmdbId, movieName)
    const movie = new Movie(movieDetails)
    await movie.save()
    return movie
  } catch(e) {
    console.error(e)
    return null
  }
}

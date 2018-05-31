const UserMovie = require('../models/userMovie')
const Movie = require('../models/movie')

module.exports = async username => {
  const userMovie =  await UserMovie.find({ username })
  const filteredForTmdbId = userMovie.map(data => ({tmdbId: data.tmdbId}))
  const movies = await Movie.find().or(filteredForTmdbId)
  const uniqueTmdbIds = new Set(movies
    .map(movie => movie.tmdbId))
  const uniqueMovies = movies.filter(movie => {
    if (uniqueTmdbIds.has(movie.tmdbId)) {
      uniqueTmdbIds.delete(movie.tmdbId)
      return true
    }
    return false
  })
  return uniqueMovies
}

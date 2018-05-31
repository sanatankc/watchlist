const UserMovie = require('../models/userMovie')
const Movie = require('../models/movie')

module.exports = async username => {
  const userMovie =  await UserMovie.find({ username })
  const filteredForTmdbId = userMovie.map(data => ({tmdbId: data.tmdbId}))
  const movies = await Movie.find().or(filteredForTmdbId)
  const uniqueMovies = [{}]
  movies.forEach(movie => {
    if (!uniqueMovies[0][`${movie.tmdbId}`]) {
      uniqueMovies[0][`${movie.tmdbId}`] = movie
    }
  })
  return Object.values(uniqueMovies[0])
}

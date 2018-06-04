const UserMovie = require('../models/userMovie')
const Movie = require('../models/movie')

module.exports = async (username, isInWatchList) => {
  console.log(isInWatchList)
  const query = typeof isInWatchList === 'boolean'
    ? { username, isInWatchList }
    : { username }
  console.log(query)
  const userMovie =  await UserMovie.find(query)
  const filteredForTmdbId = userMovie.map(data => data.tmdbId)
  const movies = await Movie.find().where('tmdbId').in(filteredForTmdbId)
  return movies
}

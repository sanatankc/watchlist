const UserMovie = require('../models/userMovie')
const getMovieFromDB = require('./getMovieFromDB')
const addMovieToDB = require('./addMovieToDB')

module.exports = async (tmdbId, movieName, username) => {
  if (await UserMovie.findOne({tmdbId, username})) {
    throw new Error('ALREADY_EXISTS')
  }

  let movie = await getMovieFromDB(tmdbId)
  if (movie === null) {
    movie = await addMovieToDB(tmdbId, movieName)
  }
  if (movie === null) {
    throw new Error('MOVIE_NULL')
  }

  const userMovie = new UserMovie({
    tmdbId,
    username,
    isInWatchList: true,
  })
  await userMovie.save()
  return movie
}

const UserMovie = require('../models/userMovie')
const getMovieFromDB = require('./getMovieFromDB')
const addMovieToDB = require('./addMovieToDB')

module.exports = async (tmdbId, movieName, username) => {
  let movie = await getMovieFromDB(tmdbId)
  if (movie === null) {
    movie = await addMovieToDB(tmdbId, movieName)
  }

  if (await UserMovie.findOne({tmdbId, username})) {
    return movie
  }

  const userMovie = new UserMovie({
    tmdbId,
    username,
    isInWatchList: true,
  })
  await userMovie.save()
  return movie
}

const UserMovie = require('../models/UserMovie')

module.exports = async (tmdbId, username) => {
  const movie = await UserMovie.findOne()
    .where('tmdbId').equals(tmdbId)
    .where('username').equals(username)
    .exec()
  return movie
}

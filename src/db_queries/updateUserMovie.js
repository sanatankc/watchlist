const UserMovie = require('../models/userMovie')

const updateUserMovie = async (tmdbId, dataToUpdate, username) => {
  const updatedMovie = await UserMovie.findOneAndUpdate({ tmdbId, username }, dataToUpdate, {new: true}).exec()
  return updatedMovie
}

module.exports = updateUserMovie
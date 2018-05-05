const fetch = require('node-fetch')
const getStreamDetails = require('./getStreamDetails')
const getTmdbDetails = require('./getTmdbDetails')
const getImdbDetails = require('./getImdbDetails')

const getMovieDetails = async (tmdbId, movieName) => {
  // parallel fetch
  const combined_results = await Promise.all([getTmdbDetails(tmdbId), getStreamDetails(movieName)])
  // flatten results
  console.log(combined_results)
  const merged_data = combined_results.reduce((acc, prev) => Object.assign(acc, prev), {})
  const imdbDetails = await getImdbDetails(merged_data.imdbId)
  return {
    name: movieName,
    tmdbId,
    ...imdbDetails,
    ...merged_data,
  }
}

module.exports = getMovieDetails
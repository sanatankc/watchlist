const fetch = require('node-fetch')

const getTmdbDetails = async tmdbId => {
  const { TMDB_API } = process.env
  const url = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API}&append_to_response=videos`
  const res = await fetch(url)
  const data = await res.json()
  const {
    release_date,
    imdb_id,
    runtime,
    poster_path,
    videos
  } = data
  const trailer = videos.results[0]
    ? `https://www.youtube.com/watch?v=${videos.results[0].key}`
    : null

  return {
    releaseDate: release_date,
    imdbId: imdb_id,
    duration: String(runtime),
    image: poster_path,
    trailer
  }
}

module.exports = getTmdbDetails

const fetch = require('node-fetch')

const getImdbDetails = async imdbId => {
  const { OMDB_API } = process.env
  const url = `http://www.omdbapi.com/?apikey=${OMDB_API}&i=${imdbId}`
  const res = await fetch(url)
  const data = await res.json()
  const {
    Director,
    Writer,
    Actors,
    imdbRating
  } = data
  return {
    director: Director,
    writers: Writer,
    cast: Actors,
    imdbRating
  }
}

module.exports = getImdbDetails

const fetch = require('node-fetch')

const getStreamDetails = async movie_name => {
  const url = `https://api.justwatch.com/titles/en_IN/popular`
  const providers = {
    '8': 'netflix',
    '119': 'amazon'
  }
  const providersLink = {
    netflix: null,
    amazon: null
  }

  const query = {
    query: movie_name
  }
  const res = await fetch(url, {
    method: 'post',
    body: JSON.stringify(query)
  })

  const data = await res.json()
  if (!data.items[0]) return providersLink

  const offers = data.items[0].offers
  if (!offers) return providersLink

  for (const offer of offers) {
    const providerId = offer.provider_id
    if (providerId in providers) {
      const provider = providers[providerId]
      if (providersLink[provider] === null) {
        providersLink[provider] = offer.urls.standard_web
      }
    }
  }

  return providersLink
}

module.exports = getStreamDetails

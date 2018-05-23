const { makeExecutableSchema } = require('graphql-tools')
const jwt = require('jsonwebtoken')
const getMovieFromDB = require('./db_queries/getMovieFromDB')
const addMovieToDB = require('./db_queries/addMovieToDB')
const addUserToDB = require('./db_queries/addUserToDB')
const isUserInDB = require('./db_queries/isUserInDB')
const addMovieToUser = require('./db_queries/addMovieToUser')
const getAddedMoviesByUser = require('./db_queries/getAddedMoviesByUser')

const gql = String.raw

const typeDefs = gql`
  type Query {
    getMovie(tmdbId: String!, movieName: String!): Movie,
    addedMovies: [Movie]
  }
  type Mutation {
    signup(username: String!, password: String!): String
    login(username: String!, password: String!): String
    addMovie(tmdbId: String!, movieName: String!): Movie,
  }

  type Movie @cacheControl(maxAge: 60) {
    tmdbId: String
    imdbId: String
    name: String
    releaseDate: String
    image: String
    duration: String
    director: String
    writers: String
    cast: String
    imdbRating: String
    trailer: String
    netflix: String
    amazon: String
  }
`

const resolvers = {
  Query: {
    async getMovie(obj, args, context, info) {
      const { tmdbId, movieName } = args
      let movie = await getMovieFromDB(tmdbId)
      if (movie === null) {
        movie = await addMovieToDB(tmdbId, movieName)
      }
      return movie
    },

    async addedMovies(obj, args, context)  {
      const { username } = context.user
      const addedMoviesByUser =  getAddedMoviesByUser(username)
      return addedMoviesByUser
    }
  },

  Mutation: {
    async signup(obj, { username, password }, context) {
      const payload = await addUserToDB(username, password)
      if (payload.error) {
        throw new Error(payload.error)
        return null
      }
      return jwt.sign(
        payload,
        context.JWT_SECRET,
        { expiresIn: '10y' }
      )
    },

    async login(obj, { username, password }, context) {
      const isUser = isUserInDB(username, password)
      if (isUser) {
        return jwt.sign(
          { username },
          context.JWT_SECRET,
          { expiresIn: '10y' }
        )
      }
      throw new Error('INCORRECT_CREDENTIALS')
    },

    async addMovie(obj, { tmdbId, movieName }, context) {
      const { username } = context.user
      return addMovieToUser(tmdbId, movieName, username)
    },
  }
}

module.exports = {
  typeDefs,
  resolvers
}

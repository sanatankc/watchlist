const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const mongoose = require('mongoose')
const expressJWT = require('express-jwt')
const cors = require('cors')
const { resolvers, typeDefs } = require('./schema')
const addMovieToUser  = require('./db_queries/addMovieToUser')
require('dotenv').config()

// connect to db
mongoose.connect(process.env.DB_URL)

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const auth = expressJWT({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
})

// Initialize the app
const app = express()
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))
// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), auth, graphqlExpress(req => ({
  schema,
  context: {
    user: req.user,
    JWT_SECRET: process.env.JWT_SECRET
  }
})))

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// dummy endpoint
app.get('/test', async (req, res) => {
  //test
  const payload = await addMovieToUser('2123', 'sanatankc')
  res.json(payload)
})

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!')
})
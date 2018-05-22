const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = mongoose.model('User', Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  movies: [String]
}))

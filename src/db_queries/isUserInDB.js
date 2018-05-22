const User = require('../models/user')

module.exports = async (username, password) => {
  const user = await User.findOne({ username })
  if(user && password === user.password) {
    return true
  }
  return false
}

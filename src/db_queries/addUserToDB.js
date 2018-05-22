const User = require('../models/user')

module.exports = async (username, password) => {
  if (username === '' || password === '') {
    return {
      error: 'EMPTY_FIELDS'
    }
  }

  try {
    const user = new User({
      username,
      password
    })
    await user.save()
    return {
      username
    }
  } catch(e) {
    const user = await User.find({ username })
    if (user) {
      return {
        error: 'USER_EXISTS'
      }
    } else {
      return {
        error: 'UNCAUGHT_ERROR'
      }
    }
  }
}
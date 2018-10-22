const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let userSchema = new mongoose.Schema({
  username: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
  firstName: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  secondName: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  salt: String,
  hashedPass: String,
  roles: [String]
})

userSchema.method({
    authenticate: (password) => {
      if (encryption.generateHashedPassword(this.salt, password)=== this.hashedPass) { 
          return true
      }
      else {
            return false
      }
    }
  })

  let User = mongoose.model('User', userSchema)
  module.exports = User

  module.exports.seedAdminUser = () => {
    User.find({}).then((users) => {
      if (users.length > 0) return
      let salt = encryption.generateSalt()
      let hashedPass = encryption.generateHashedPassword(salt, 'atanas')
      User.create({
        username: 'atanas',
        firstName: 'Atanas',
        lastName: 'Vasilev',
        salt: salt,
        hashedPass: hashedPass,
        roles: ['Admin']})
    })
  }
  

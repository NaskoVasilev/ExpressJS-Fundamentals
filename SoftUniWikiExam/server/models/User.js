const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')

let userSchema = new mongoose.Schema({
  username: { type: String, required: "Username is required!", unique: true },
  salt: String,
  hashedPass: String,
  roles: [{type:String,default:[]}]
})

userSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
  }
})

let User = mongoose.model('User', userSchema)

module.exports = User
module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length > 0) return

    let salt = encryption.generateSalt()
    let hashedPass = encryption.generateHashedPassword(salt, '123456')

    User.create({
      username: 'Admin',
      salt: salt,
      hashedPass: hashedPass,
      roles: ['Admin']
    })
  })
}

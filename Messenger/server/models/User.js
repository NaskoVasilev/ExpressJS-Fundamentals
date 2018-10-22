const mongoose = require('mongoose')
const encryption = require('../infrastructure/encryption')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required';

let userSchema = new mongoose.Schema({
    username: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
    hashedPass: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    otherUsers :[{type:mongoose.Schema.Types.String,default:[]}],
    blockedUsers:[{type:mongoose.Schema.Types.String,default:[]}],
    salt: String,
    roles: { type: String, default: [] }
})

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
    }
})

let User = mongoose.model('User', userSchema)

module.exports = User
module.exports.seedUsers = () => {
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

        let secondUserSalt = encryption.generateSalt();
        User.create({
            username: 'atanas',
            salt: secondUserSalt,
            hashedPass: encryption.generateHashedPassword(secondUserSalt, 'atanas'),
        })

        console.log('Seed complete.')
    })
}

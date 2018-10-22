const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const connectionString = 'mongodb://localhost:27017/imageDb'

module.exports = mongoose.connect(connectionString)
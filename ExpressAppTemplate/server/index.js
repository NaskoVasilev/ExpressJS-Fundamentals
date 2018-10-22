const mongoose = require('mongoose')
const express = require('express')
const handlebars = require('express-handlebars')
let env = process.env.NODE_ENV || 'development'
const settings = require('./config/settings')[env]
require('./config/database')(settings)

mongoose.Promise = global.Promise
let app = express()
require('./config/express')(app)
require('./config/routes')(app)
require('./config/passport')()

app.listen(settings.port)

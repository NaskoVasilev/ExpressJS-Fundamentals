const express = require('express')
const port = 8000
const app = express()
const database = require('./config/database')
const connectionString = 'mongodb://localhost:27017/MemesDatabase'
database(connectionString)
require('./config/express')(app)
require('./config/routes')(app)
app.listen(port, () => { console.log('Listening on port: ' + port) })
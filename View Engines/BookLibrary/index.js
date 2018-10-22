const express=require('express')
const app=express()
const env=process.env.NODE_environment || 'development'
const config=require('./config/settings')
const database=require('./config/database')

database(config[env])
require('./config/express')(app)
require('./config/routes')(app)

app.listen(config[env].port,()=>{
    console.log(`Listening on port ${config[env].port}`)
})
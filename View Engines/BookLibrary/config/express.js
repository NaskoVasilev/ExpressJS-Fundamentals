const handlebars=require('express-handlebars')
const bodyParser = require('body-parser')
const express=require('express')

module.exports=(app)=>{
    app.engine('hbs',handlebars({
        extname:'.hbs',
        layoutsDir:'views',
        defaultLayout:'layout'
    }))
    app.set('view engine','hbs')
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(express.static('static'))
}
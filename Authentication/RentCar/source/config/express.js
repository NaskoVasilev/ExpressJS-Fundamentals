const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const handlebars =require('express-handlebars')
const passport = require('passport')

module.exports = (app, config) => {
    app.engine('.hbs', handlebars({
        extname: '.hbs',
        layoutsDir:'source/views',
        defaultLayout: 'main'
    }))
    app.set('view engine', '.hbs')
    app.set('views', path.join(__dirname, '../views'))
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(cookieParser())
    app.use(session({
        secret: 'S3cr3t',
        saveUninitialized: false,
        resave: false
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.user = req.user
        }
        next()
    })

    app.use((req, res, next) => {
        if (req.url.startsWith('/public')) {
            req.url = req.url.replace('/public', '')
        }
        next()
    }, express.static(path.normalize(path.join(config.rootPath, 'public'))))
}
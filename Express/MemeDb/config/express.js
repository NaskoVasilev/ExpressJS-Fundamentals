const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const rootPath = path.normalize(path.join(__dirname, '../'))

module.exports = (app) => {
    app.use(fileUpload())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use((req, res, next) => {
        if (req.url.startsWith('/public')) {
            req.url = req.url.replace('/public', '')
        }
        next()
    }, express.static(path.normalize(path.join(rootPath, 'public'))))
}
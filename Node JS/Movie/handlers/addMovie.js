let renderView = require('./renderView')
let db = require('../config/dataBase')
const formidable = require('formidable')
const placeholder = '<div id="replaceMe">{{replaceMe}}</div>'

module.exports = (req, res) => {
    const path = req.url
    const filePath = '/views/addMovie.html'
    if (path.startsWith('/addMovie') && req.method === 'GET') {
        renderView(filePath, req, res)
    } else if (path.startsWith('/addMovie') && req.method === 'POST') {
        let formIsValid = false
        let form = new formidable.IncomingForm()
        form.parse(req, (err, data) => {
            if (err) {
                console.log(err)
                return
            }
            if (data['movieTitle'] !== '' && data['moviePoster'] !== '') {
                db.push(data)
                formIsValid = true
            }
            let html = '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>'
            if (!formIsValid) {
                html = '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>'
            }
            renderView(filePath, req, res, placeholder, html)
        })

    } else {
        return true
    }
}
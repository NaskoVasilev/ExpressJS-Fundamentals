let renderView = require('./renderView')
let db = require('../config/dataBase')
const placeholder = '<div id="replaceMe">{{replaceMe}}</div>'

module.exports = (req, res) => {
    const path = req.url
    if (path.startsWith('/details') && req.method === 'GET') {
        let filePath = '/views/details.html'
        let index = path.substring(path.lastIndexOf('/') + 1)

        let movie = db[index]

        let html = `<div class="content">
        <img src="${unescape(movie.moviePoster)}" alt=""/>
        <h3>Title  ${movie.movieTitle}</h3>
        <h3>Year ${movie.movieYear}</h3>
        <p> ${movie.movieDescription}</p>
    </div>
    `
        renderView(filePath, req, res, placeholder, html)
    } else {
        return true
    }
}
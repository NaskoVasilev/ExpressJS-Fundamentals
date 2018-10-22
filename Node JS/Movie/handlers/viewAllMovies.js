const moviesPlaceholder = '<div id="replaceMe">{{replaceMe}}</div>'
const movies = require('../config/dataBase')
let renderView = require('./renderView')

module.exports = (req, res) => {
    const path = req.url
    if (path.startsWith('/viewAllMovies') && req.method === 'GET') {
        let filePath = '/views/viewAll.html'

        let html = ''
        let id = 0
        for (let movie of movies) {
            html += `<a href="/details/${id++}"><div class="movie">
            <img class="moviePoster" src="${unescape(movie.moviePoster)}"/>          
          </div></a>`
        }
        renderView(filePath, req, res, moviesPlaceholder, html)
    } else {
        return true
    }
}


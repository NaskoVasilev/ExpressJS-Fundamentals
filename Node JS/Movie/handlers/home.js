let renderView = require('./renderView')
const url = require('url')

module.exports = (req, res) => {
    const path = url.parse(req.url).pathname
    if (path.startsWith('/') && req.method === 'GET') {
        let filePath = '/views/home.html'

        renderView(filePath, req, res)
    } else {
        return true
    }
}
let renderView = require('./renderView')
const url=require('url')

module.exports = (req, res) => {
    const path=url.parse(req.url).pathname
    if (path.startsWith('/public/')) {
        renderView(path, req, res)
    }else {
        return true
    }
}


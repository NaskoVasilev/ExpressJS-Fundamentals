const fs = require('fs')

function getContentType(url) {
    let contentType = ''
    if (url.endsWith('.css')) {
        contentType = 'text/css'
    } else if (url.endsWith('.html')) {
        contentType = 'text/html'
    } else if (url.endsWith('.png')) {
        contentType = 'image/png'
    } else if (url.endsWith('.jpg')) {
        contentType = 'image/jpg'
    } else if (url.endsWith('.js')) {
        contentType = 'application/javascript'
    }
    return contentType
}

module.exports = (url, req, res, placeholder, html) => {
    fs.readFile('.' + url, (err, data) => {
        if (err) {
            res.writeHead(404, {
                'content-type': 'text/plain'
            })
            res.write('404 File not found!')
            res.end()
            return
        }
        res.writeHead(200, {
            'content-type': getContentType(req.url)
        })
        if (html) {
            data = data.toString().replace(placeholder, html)
        }
        res.write(data)
        res.end()
    })
}

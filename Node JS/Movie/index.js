let http = require('http')
const handlers = require('./handlers')
const port = 8000
http.createServer(function (req, res) {

    for (let handler of handlers) {
        if (!handler(req, res)) {
            break
        }
    }
}).listen(port)
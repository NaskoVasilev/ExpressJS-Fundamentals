const handlers = require('../handlers/handler')

module.exports = (app) => {
    app.get('/', (req, res) => {
        handlers.home.index(req, res)
    })

    app.get('/viewAllMemes', (req, res) => {
        handlers.meme.viewAll(req, res)
    })

    app.get('/addMeme', (req, res) => {
        handlers.meme.addMemeGet(req, res)
    })
    app.post('/addMeme', (req, res) => {
        handlers.meme.addMemePost(req, res)
    })

    app.get('/addGenre', (req, res) => {
        handlers.meme.addGenreGet(req, res)
    })
    app.post('/addGenre', (req, res) => {
        handlers.meme.addGenrePost(req, res)
    })

    app.get('/getDetails/:id', (req, res) => {
        handlers.meme.details(req, res)
    })
    app.get('/getDetails/meme/delete/:id' ,(req, res) => {
        handlers.meme.removeMeme(req, res)
    })

    app.post('/searchMeme',(req,res)=>{
        handlers.meme.searchForMeme(req,res)
    })
    app.get('/searchMeme',(req,res)=>{
        handlers.meme.renderSearchView(req,res)
    })
}
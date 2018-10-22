const Book = require('../models/Book')

module.exports = {
    getAddBook: (req, res) => {
        res.render('addBook')
    },
    postAddBook: (req, res) => {
        let data = req.body

        if (!data.title || !data.releaseDate || !data.imageUrl || !data.author || isNaN(Number(data.releaseDate))) {
            data.error = true
            res.render('addBook', data)
            return
        }
        data.releaseDate = Number(data.releaseDate)
        Book.create(data)
            .then(() => {
                res.redirect('/viewAllBooks')
            })
    },
    getAllBooks: (req, res) => {
        Book.find()
            .sort('-releaseDate')
            .then(books => {
                res.render('viewAll', { books })
            })
    },
    getBookDetails: (req, res) => {
        let id = req.params.id

        Book.findById(id)
            .then(book => {
                res.render('details', book)
            })
    },
    getBookEdit: (req, res) => {
        let id = req.params.id

        Book.findById(id)
            .then(book => {
                res.render('editBook', book)
            })
    },
    postEditBook: (req, res) => {
        let data = req.body
        let id = req.params.id

        if (!data.title || !data.releaseDate || !data.imageUrl || !data.author || isNaN(Number(data.releaseDate))) {
            data.error = true
            res.render('editBook', data)
            return
        }
        data.releaseDate = Number(data.releaseDate)
        Book.findById(id).then(book => {
            book.title = data.title
            book.releaseDate = data.releaseDate
            book.imageUrl = data.imageUrl
            book.author = data.author
            book.save()
                .then(() => {
                    res.redirect('/viewAllBooks')
                })
        })
    },
    deleteBook: (req, res) => {
        let id = req.params.id

        Book.findByIdAndDelete(id)
            .then(() => {
                res.redirect('/viewAllBooks')
            })
    }
}
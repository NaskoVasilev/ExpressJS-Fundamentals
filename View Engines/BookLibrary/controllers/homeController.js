const Book = require('../models/Book')

module.exports.getIndex = (req, res) => {
    Book.count()
        .then(booksCount => {
            res.render('index', { booksCount })
        })
}
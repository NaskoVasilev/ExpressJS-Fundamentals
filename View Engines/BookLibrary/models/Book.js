const mongoose = require('mongoose')

let bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String },
    imageUrl: { type: String, required: true },
    releaseDate: { type: Number, required: true }
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
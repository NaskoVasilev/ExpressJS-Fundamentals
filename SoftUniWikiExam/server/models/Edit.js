const mongoose = require('mongoose');

let editSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    content: {type: String, required: 'Content is required'},
    creationDate: {type: Date, default: Date.now},
    articleId: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'}
})

let Edit = mongoose.model('Edit', editSchema);

module.exports = Edit;
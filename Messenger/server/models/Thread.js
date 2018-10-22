const mongoose = require('mongoose');

let threadSchema =new mongoose.Schema({
    usernames: [{type: mongoose.Schema.Types.String, required: true, default: []}],
    dateCreated: {type: Date, default: Date.now}
});

let Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;
const mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
    content: {type: String, maxlength:1000, required: "Message can not be more than 1000 symbols",},
    creator: {type: mongoose.Schema.Types.ObjectId,required:true, ref: 'User'},
    threadId: {type: mongoose.Schema.Types.ObjectId,required:true, ref: 'Thread'},
    isLiked:{type:mongoose.Schema.Types.Boolean,default:false},
    dateCreated: {type: Date, default: Date.now}
})

let Message = mongoose.model('Message', messageSchema);

module.exports = Message;
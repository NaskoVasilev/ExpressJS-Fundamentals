const router = require('express').Router();
const Message = require('mongoose').model('Message');

const likeMessage = (req, res) => {
    let messageId = req.params.id;
    let username = req.params.username;

    Message.findById(messageId)
        .then(message => {
            message.isLiked = true;
            message.save()
                .then(() => {
                    res.redirect('/threads/' + username);
                })
        })
}

const unlikeMessage = (req, res) => {
    let messageId = req.params.id;
    let username = req.params.username;

    Message.findById(messageId)
        .then(message => {
            message.isLiked = false;
            message.save()
                .then(() => {
                    res.redirect('/threads/' + username);
                })
        })
}

router
    .get('/:id/like/:username', likeMessage)
    .get('/:id/unlike/:username', unlikeMessage);

module.exports = router;

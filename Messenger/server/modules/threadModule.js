const router = require('express').Router();
const User = require('mongoose').model('User');
const Thread = require('mongoose').model('Thread');
const Message = require('mongoose').model('Message');
const messageChecker = require('../infrastructure/utility');

const findUser = (req, res) => {
    let otherUser = req.body.username;

    if (otherUser === req.user.username) {
        req.session.globalError = 'Cannot chat with yourself!'
        res.redirect('/')
        return;
    }

    User.findOne({username: otherUser})
        .then(user => {
            if (!user) {
                req.session.globalError = 'No such user in the database!';
                res.redirect('/')
                return;
            }

            Thread
                .findOne({usernames: {$all: [otherUser, req.user.username]}})
                .then(thread => {
                    if (!thread) {
                        Thread
                            .create({usernames: [otherUser, req.user.username]})
                            .then(thread => {
                                req.user.otherUsers.push(user.username)
                                user.otherUsers.push(req.user.username);
                                Promise.all([user.save(), req.user.save()])
                                    .then(() => {
                                        res.redirect(`/threads/${user.username}`);
                                    })
                            })
                    } else {
                        res.redirect(`/threads/${user.username}`);
                    }
                })
        })
}

const getChatRoom = (req, res) => {
    let currentUsername = req.user.username;
    let otherUsername = req.params.username;

    Thread.findOne({usernames: {$all: [currentUsername, otherUsername]}})
        .then(thread => {
            if (!thread) {
                req.session.globalError = 'Tread no longer exists!';
                res.redirect('/');
                return;
            }

            thread.otherUsername = otherUsername;
            Message.find({threadId: thread._id})
                .sort({dateCreated: 1})
                .populate('user')
                .then(messages => {
                    User.findOne({username: otherUsername})
                        .then(user => {
                            if (!user.blockedUsers) {
                                user.blockedUsers = [];
                                user.save();
                            }
                            else {
                                if (user.blockedUsers.indexOf(req.user.username) !== -1) {
                                    thread.isBlocked = true;
                                }
                            }

                            for (const message of messages) {
                                if (message.creator.equals(req.user._id)) {
                                    message.isCurrentUserMessage = true;
                                }
                                else {
                                    message.isCurrentUserMessage = false;
                                }

                                if (messageChecker.isLink(message.content)) {
                                    message.isLink = true;
                                }
                                if (messageChecker.isImage(message.content)) {
                                    message.isImage = true;
                                }
                            }
                            thread.messages = messages;

                            res.render('threads/chatroom', thread)
                        })
                })
        })
}

const sendMessage = (req, res) => {
    let threadId = req.body.threadId;
    let messageContent = req.body.message;
    let otherUsername = req.body.otherUsername;

    Message.create({
        content: messageContent,
        threadId: threadId,
        creator: req.user._id
    }).then(() => {
        res.redirect(`/threads/${otherUsername}`)
    }).catch(err => {
        req.session.globalError = err;
        res.redirect('/')
        return;
    })
}

router
    .post('/find', findUser)
    .get('/:username', getChatRoom)
    .post('/message/send', sendMessage)

module.exports = router
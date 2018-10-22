const router = require('express').Router();
const passport = require('passport');

const encryption = require('../infrastructure/encryption')
const User = require('../models/User');

const getUserRegister = (req, res) => {
    res.render('users/register')
};
const postUserRegister = (req, res) => {
    let reqUser = req.body

    if (!reqUser.username || !reqUser.password) {
        req.session.globalError = "Username and password are required!"
        res.render('users/register', reqUser);
        return;
    }

    let salt = encryption.generateSalt()
    let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)

    User.create({
        username: reqUser.username,
        salt: salt,
        otherUsers: [],
        hashedPass: hashedPassword
    }).then(user => {
        req.logIn(user, (err, user) => {
            if (err) {
                req.session.globalError = err
                res.render('users/register', user)
            }

            res.redirect('/')
        })
    })
};

const getUserLogin = (req, res) => {
    res.render('users/login')
};
const postUserLogin = (req, res) => {
    res.redirect('/');
};

const getUserLogout = (req, res) => {
    req.logout()
    res.redirect('/')
};

const block = (req, res) => {
    let username = req.params.username;
    if (!req.user.blockedUsers) {
        req.user.blockedUsers = [];
    }

    req.user.blockedUsers.push(username);
    req.user.save()
        .then(() => {
            res.redirect('/')
        })
}

const unblock = (req, res) => {
    let username = req.params.username;
    let index = req.user.blockedUsers.indexOf(username);

    if (index !== -1) {
        req.user.blockedUsers.splice(index, 1);
        req.user.save()
            .then(() => {
                res.redirect('/');
            })
    }
}

router
    .get('/login', getUserLogin)
    .post('/login', passport.authenticate('local'), postUserLogin)
    .get('/logout', getUserLogout)
    .get('/register', getUserRegister)
    .post('/register', postUserRegister)
    .get('/:username/block', block)
    .get('/:username/unblock', unblock);

module.exports = router;

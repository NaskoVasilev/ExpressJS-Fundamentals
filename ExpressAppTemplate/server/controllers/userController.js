let User = require('../data/User')
const encryption = require('../utilities/encryption')

module.exports.registerGet = (req, res) => {
    res.render('user/register')
}

module.exports.registerPost = (req, res) => {
    let user = req.body
    if (!user.password || !user.username) {
        res.redirect('users/register')
    }
    let salt = encryption.generateSalt()
    user.salt = salt

    if (user.password) {
        let hashedPasssword = encryption.generateHashedPassword(salt, user.password)
        user.password = hashedPasssword
    }

    User.create(user)
        .then((user) => {
            req.logIn(user, (error, user) => {
                if (error) {
                    res.locals.globalError = error
                    res.render('users/register')
                    return
                }
                res.redirect('/')
            })
        }).catch(err => {
            console.log(err)
            return
        })
}

module.exports.logout = (req, res) => {
    req.logout()
    res.redirect('/')
}

module.exports.loginGet = (req,res)=>{
    res.render('user/login')
}

module.exports.loginPost = (req, res) => {
    let userToLogin = req.body
    console.log(userToLogin)
    console.log( userToLogin.username)
    User.findOne({ username: userToLogin.username })
        .then(user => {
            if (!user || !user.authenticate(userToLogin.password)) {
                res.render('user/login')
            } else {
                req.logIn(user, (error, user) => {
                    if (error) {
                        res.render('user/login')
                        return
                    }
                    res.redirect('/')
                })
            }
        }).catch(err=>{
            console.log(err)
            return
        })
}
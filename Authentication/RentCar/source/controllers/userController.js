const User = require('../models/User')
const encryption = require('../utilities/encryption')

module.exports.registerGet = (req,res)=>{
    console.log('here')
    res.render('users/register')
}

module.exports.registerPost = (req,res)=>{
    let user = req.body
    user.rentedCars = []
    if(!user.password||!user.username){
        res.redirect('users/register')
    }
    let salt =encryption.generateSalt()
    user.salt=salt

    if(user.password){
        let hashedPasssword = encryption.generateHashedPassword(salt,user.password)
        user.password=hashedPasssword
    }

    User.create(user)
    .then((user)=>{
        req.logIn(user, (error, user) => {
            if (error) {
                res.render('users/register')
                return
            }
            res.redirect('/')
        })
    }).catch(err=>{
        console.log(err) 
        return  
    })
}

module.exports.loginGet = (req,res)=>{
    console.log('here')
    res.render('users/login')
}

module.exports.loginPost = (req, res) => {
    let userToLogin = req.body

    User.findOne({ username: userToLogin.username })
        .then(user => {
            if (!user || !user.authenticate(userToLogin.password)) {
                res.render('users/login')
            } else {
                req.logIn(user, (error, user) => {
                    if (error) {
                        res.render('users/login')
                        return
                    }
                    res.redirect('/')
                })
            }
        })
}

module.exports.logout = (req, res) => {
    req.logout()
    res.redirect('/')
}

module.exports.myRentedCars = (req,res)=>{
    User.findById(req.user._id).populate('rentedCars')
    .then((user)=>{
        res.render('users/profile', user)
    })
}
const router = require('express').Router();

const getHome = (req, res) => {
    let users = [];
    if (req.user) {
        for (const user of req.user.otherUsers) {
            let currentUser = {};
            currentUser.username = user;
            if (req.user.blockedUsers.indexOf(user) !== -1) {
                currentUser.isBlocked = true
            }
            users.push(currentUser)
        }
    }
    res.render('home/index', {users});
};

router
    .get('/', getHome)

module.exports = router;
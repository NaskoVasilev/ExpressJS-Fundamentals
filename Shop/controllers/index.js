const homeHandler = require('./home')
const productHandler = require('./product')
const categoryHandler = require('./categoryHandler')
const userController = require('./userController')

module.exports = {
    home: homeHandler,
    product: productHandler,
    category: categoryHandler,
    user: userController
}
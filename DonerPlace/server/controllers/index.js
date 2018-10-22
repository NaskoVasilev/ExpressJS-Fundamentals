const home = require('./home-controller')
const users = require('./users-controller')
const product = require('./productController')
const order = require('./orderController')

module.exports = {
  home: home,
  users: users,
    product:product,
    order:order,
}

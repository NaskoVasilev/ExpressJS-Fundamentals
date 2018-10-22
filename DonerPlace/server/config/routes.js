const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
    app.get('/', controllers.home.index)
    app.get('index.html', controllers.home.index)

    app.get('/users/register', controllers.users.registerGet)
    app.post('/users/register', controllers.users.registerPost)
    app.get('/users/login', controllers.users.loginGet)
    app.post('/users/login', controllers.users.loginPost)
    app.get('/users/logout', controllers.users.logout)

    app.get('/product/create',auth.isInRole('Admin'), controllers.product.createGet)
    app.post('/product/create',auth.isInRole('Admin'), controllers.product.createPost)

    app.get('/product/order/:id',auth.isAuthenticated, controllers.order.orderGet)
    app.post('/product/order/:id',auth.isAuthenticated, controllers.order.orderPost)

    app.get('/users/myOrders',auth.isAuthenticated,controllers.order.getMyOrders)
    app.get('/order/details/:id',auth.isAuthenticated,controllers.order.getDetails)
    app.post('/order/saveChanges',auth.isInRole('Admin'),controllers.order.changeStatus)

    app.all('*', (req, res) => {
        res.status(404)
        res.send('404 Not Found!')
        res.end()
    })
}

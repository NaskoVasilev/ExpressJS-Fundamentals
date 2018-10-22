let controllers=require('../controllers/controller')
let auth=require('../config/auth')

module.exports = (app)=>{
    app.get('/',controllers.homeController.index)

    app.get('/users/register',controllers.userController.registerGet)
    app.post('/users/register',controllers.userController.registerPost)

    app.get('/users/login',controllers.userController.loginGet)
    app.post('/users/login',controllers.userController.loginPost)
    app.post('/users/logout',controllers.userController.logout)

    app.get('/cars/create',auth.isInRole('Admin'),controllers.carController.createCarGet)
    app.post('/cars/create',auth.isInRole('Admin'),controllers.carController.createCarPost)

    app.get('/cars/all',controllers.carController.listAllCars)

    app.get('/cars/edit/:id',auth.isInRole('Admin'),controllers.carController.editCarGet)
    app.post('/cars/edit/:id',auth.isInRole('Admin'),controllers.carController.editCarPost)

    app.get('/users/profile/me',auth.isAuthenticated,controllers.userController.myRentedCars)
    app.post('/cars/rent/:id',auth.isAuthenticated,controllers.carController.rentCar)
    app.post('/cars/return/:id',auth.isAuthenticated,controllers.carController.returnCar)
}

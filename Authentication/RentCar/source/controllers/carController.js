const Car =require('../models/Car')

module.exports.createCarGet = (req,res) =>{
    res.render('cars/create')
}

module.exports.createCarPost = (req,res) =>{
    let car = req.body
    car.isRented=false
    Car.create(car)
    .then(()=>{
        res.redirect('/cars/all')
    }).catch(err=>{
        console.log(err)
        return
    })
}

module.exports.listAllCars = (req,res)=>{
    Car.find({isRented:false})
    .then((cars)=>{
        res.render('cars/all',{cars})
    }).catch(err=>{
        console.log(err)
    })
}

module.exports.editCarGet = (req,res) =>{
    let id =req.params.id

    Car.findById(id)
    .then((car)=>{
        res.render('cars/edit',{car})
    }).catch(err=>{
        console.log(err)
        return
    })
}

module.exports.editCarPost = (req,res) =>{
    let id = req.params.id
    let editedCar=req.body

    Car.findById(id)
    .then(car=>{
        if(editedCar.brand && editedCar.model && editedCar.pricePerDay){
            car.brand=editedCar.brand
            car.model=editedCar.model
            car.imageUrl=editedCar.imageUrl
            car.year=editedCar.year
            car.pricePerDay=editedCar.pricePerDay

            car.save().then(()=>{
                res.redirect('/cars/all')
            }).car(err=>{
                console.log(err)
                return
            })
        }else{
            res.redirect('/cars/edit/'+car._id)
        }
    }).catch(err=>{
        console.log(err)
        return
    })
    
}

module.exports.rentCar = (req,res)=>{
    let carId=req.params.id

    Car.findById(carId)
    .then(car=>{
        car.isRented=true
        car.save()
        req.user.rentedCars.push(car._id)
        req.user.save().then(()=>{
            res.redirect('/users/profile/me')
        })
    })
}

module.exports.returnCar = (req,res)=>{
    let id=req.params.id

    Car.findById(id)
    .then(car=>{
        let index = req.user.rentedCars.indexOf(car._id)
        if(index>=0){
            req.user.rentedCars.splice(index,1)
            req.user.save()
        }
        car.isRented=false
        car.save()
        .then(()=>{
            res.redirect('/users/profile/me')
        })
    })
}
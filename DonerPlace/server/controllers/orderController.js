let Product = require('mongoose').model('Product')
let Order = require('mongoose').model('Order')

module.exports = {
    orderGet: (req, res) => {
        let id = req.params.id
        Product.findById(id)
            .then(product => {
                res.render('order/doner', product)
            }).catch(err => {
            console.log(err)
            return
        })
    },
    orderPost: (req, res) => {
        let id = req.params.id
        let body = req.body
        let toppings = []
        for (const key in body) {
            toppings.push(key)
        }

        Product.findById(id)
            .then(product => {
                Order.create({
                    creator: req.user.id,
                    product: product._id,
                    toppings: toppings
                }).then((order) => {
                    res.redirect('/order/details/'+order._id)
                }).catch((err => {
                    console.log(err)
                    res.locals.globalError = err.message
                    res.render('product/order/' + id)
                }))
            })
    },
    getMyOrders: (req, res) => {
        if(req.user.roles.includes('Admin')){
            Order.find().populate('product', 'category size')
                .then(orders=>{
                    for (let i = 0; i < orders.length; i++) {
                        orders[i].formatedDate = orders[i].date.toString().substring(0, 24)
                    }
                    res.render('order/allOrders',{orders:orders})
                }).catch(err=>{
                console.log(err)
                return
            })
        }
        else{
            Order.find({creator: req.user.id}).populate('product', 'category size')
                .then(orders => {
                    for (let i = 0; i < orders.length; i++) {
                        orders[i].formatedDate = orders[i].date.toString().substring(0, 24)
                    }
                    res.render('order/myOrders', {orders: orders})
                }).catch(err => {
                console.log(err)
                return
            })
        }
    },
    getDetails: (req, res) => {
        let id = req.params.id

        Order.findById(id).populate('product', 'category size')
            .then(order => {
                order.formatedDate=order.date.toString().substring(0,24)
                switch (order.status) {
                    case 'Pending':
                        order.pending = true
                        break
                    case 'In Progress':
                        order.inProgress = true
                        break
                    case 'In Transit':
                        order.inTransit = true
                        break
                    case 'Delivered':
                        order.delivered = true
                        break
                }
                res.render('order/details',order)
            }).catch(err => {
            console.log(err)
        })
    },
    changeStatus:(req,res) =>{
        let body = req.body
        let promises = []
        for (const key in body) {
            let changeStatusPromise = Order.findByIdAndUpdate(key,{status:body[key]})
            promises.push(changeStatusPromise)
        }

        Promise.all(promises).then(()=>{
            res.redirect('/users/myOrders')
        }).catch(err=>{
            console.log(err)
        })
    }
}
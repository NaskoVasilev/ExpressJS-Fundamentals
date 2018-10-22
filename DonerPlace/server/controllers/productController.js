const Product = require('mongoose').model('Product')
let validToppings = ['pickle', 'tomato', 'onion', 'lettuce', 'hot sauce','extra sauce']
module.exports = {
    createGet:(req,res)=>{
        res.render('product/create')
    },
    createPost:(req,res)=>{
        let body = req.body
        let toppings=body.toppings.split(',')
            .map(t=>t.trim())
            .filter(t=>t.length>0&&validToppings.includes(t))
        Product.create({
            category:body.category,
            imageUrl:body.imageUrl,
            size:Number(body.size),
            toppings:toppings
        }).then(()=>{
            res.redirect('/')
        }).catch((err)=>{
            res.locals.globalError = err
            res.render('product/create')
        })
    }
}


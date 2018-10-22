const Product = require('mongoose').model('Product')

module.exports = {
    index: (req, res) => {
        Product.find({})
            .then(products => {
                let chickenProducts = products.filter(p => p.category === 'chicken')
                let beefProducts = products.filter(p => p.category === 'beef')
                let lambProducts = products.filter(p => p.category === 'lamb')
                products.chickenProducts = chickenProducts
                products.beefProducts = beefProducts
                products.lambProducts = lambProducts
                res.render('home/index', products)
            }).catch(err=>{
            console.log(err)
            return
        })
    },
}

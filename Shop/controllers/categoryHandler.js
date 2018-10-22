const Category = require('../models/Category')

module.exports.addGet = (req, res) => {
    res.render('category/add')
}

module.exports.addPost = (req, res) => {
    let categoryObj = req.body
    categoryObj.creator = req.user._id
    Category.create(categoryObj)
        .then((category) => {
            req.user.createdCategories.push(category._id)
            req.user.save()
                .then(() => {
                    res.redirect('/')
                })
        })
}

module.exports.productsByCategory = (req, res) => {
    let categoryName = req.params.category

    Category.findOne({ name: categoryName })
        .populate('products')
        .then((category) => {
            if (!category) {
                res.sendStatus(404)
            }
            res.render('category/products', { category: category })
        })
}
const Article = require('mongoose').model('Article')
const Edit = require('mongoose').model('Edit')
module.exports = {
    index: async (req, res) => {
        let data = {};
        try {
            let articles = await Article.find()
            if(articles.length>0){
                let latestArticle = articles[articles.length - 1];
                let editId = latestArticle.edits[latestArticle.edits.length - 1];
                let edit = await Edit.findById(editId);
                latestArticle.content = edit.content.substr(0, 250);
                data.latestArticle = latestArticle;

                let latestArticles = [];

                for (let i = articles.length - 2; i >= Math.max(0, articles.length - 4); i--) {
                    latestArticles.push(articles[i])
                }
                data.latestArticles = latestArticles;
            }

            res.render('home/index', data)
        } catch (err) {
            console.log(err);
            req.session.globalError = err;
            res.redirect('/');
        }
    }
}

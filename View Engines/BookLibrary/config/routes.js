const homeController=require('../controllers/homeController')
const bookContoller=require('../controllers/bookController')

module.exports=(app)=>{
    app.get('/',(req,res)=>{
        homeController.getIndex(req,res)
    })

    app.get('/addBook',(req,res)=>{
        bookContoller.getAddBook(req,res)
    })
    app.post('/addBook',(req,res)=>{
        bookContoller.postAddBook(req,res)
    })

    app.get('/viewAllBooks',(req,res)=>{
        bookContoller.getAllBooks(req,res)
    })

    app.get('/details/:id',(req,res)=>{
        bookContoller.getBookDetails(req,res)
    })

    app.get('/book/delete/:id',(req,res)=>{
        bookContoller.deleteBook(req,res)
    })

    app.get('/book/edit/:id',(req,res)=>{
        bookContoller.getBookEdit(req,res)
    })
    app.post('/book/edit/:id',(req,res)=>{
        bookContoller.postEditBook(req,res)
    })

}
const staticHandler= require('./staticHandler')
const homeHandler= require('./home')
const allMoviesHandler= require('./viewAllMovies')
const addMovieHandler= require('./addMovie')
const detailsHandler= require('./details')

module.exports=[allMoviesHandler,addMovieHandler,detailsHandler,staticHandler,homeHandler]
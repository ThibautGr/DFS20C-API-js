const MovieController = require ('../controllers').MovieController
const Movie = require ('../models').Movie;

let express = require('express');
let router = express.Router();

router.get('/movies',async (req, res, next) => {

    if (req.query.page) {
        const pageNumber = await MovieController.getPageMovie(req.query.page)
        if(pageNumber.length !== 0){
            res.status(200).json(pageNumber);
        }
        else{
            res.status(404).json({"error": "the page u want doesn't exist"});
        }
    }

    if (req.query.genreId) {
        const genre = await MovieController.getByGenre(req.query.genreId)
        if (genre.length !== 0) {
            res.status(200).json(genre);
        } else {
            res.status(404).json({"error": "This genre doesn't exist"});
        }
    }

    if(req.query.sort){
        if( req.query.sort === 'year' ||  req.query.sort === 'title' ){
            const sortToSearch = await MovieController.sortByYear(req.query.sort);
            res.status(200).json(sortToSearch);
        } else  {
            res.status(400).json({"error": "You can only sort by Year or Title" });
        }

    }

    if (req.query.keyword){
        const mykeyword =  await MovieController.search(req.query.keyword);
        if(mykeyword.length !== 0){
            res.status(200).json(mykeyword);
        } else {
            res.status(404).json({"error": "This keyword doesn't match"});
        }
    }

});



router.get('/movies/:id',async (req,res,next)=>{
    const movie = await MovieController.getById(req.params.id);
    if (movie){
        res.json(movie)
    } else {
        res.status(404).json({"error" : "movie doesn't exist"})
    }
});

router.post('/movies',async (req, res, next)=>{
    if (req.body.title && req.body.description && req.body.year){
        const insertedMovies = await MovieController.add(req.body);
        res.status(201).json(insertedMovies)
    } else {
        res.status(400).end();
    }
});


router.patch('/movies/:id',async (req, res, next)=>{
    if (!req.body.title && !req.body.description && req.body.year){
        res.status(400).end();
    }

    const UpdatedMovie = await  MovieController.update(req.params.id,req.body)
    if (UpdatedMovie[0] === 1){
        res.json(await MovieController.getById(req.params.id))
    }else {
        res.status(404).json({'error':"movie not found"})
    }
});

router.delete('/movies/:id', async (req, res, next)=>{
    const success = await MovieController.delete(req.params.id);
    if (success){
        return res.status(204).end();
    }
    else {
        res.status(404).json({"error": "movie not found"});
    }
})

module.exports = router;
const MovieController = require ('../controllers').MovieController

let express = require('express');
let router = express.Router();

router.get('/movies',async (req, res, next) => {

    if (req.query.page) {
         const pageNumber = await MovieController.getPageMovie(req.query.page)
        if(pageNumber){
            res.status(200).json(pageNumber);
        }
        else{
            res.status(404).json({"error": "the page u want doesn't exist"});
        }
    }

    if (req.query.genreId) {
        const genre = await MovieController.getByGenre(req.query.genreId)
        console.log(genre)
        if (genre) {
            res.status(200).json(genre);
        } else {
            res.status(404).json({"error": "This genre doesn't exist"});
        }
    }

    if(req.query.sort){
        const sortToSearch = await MovieController.sortByYear(req.query.sort)
        if(sortToSearch){
            res.status(200).json(sortToSearch);
        }
        else{
            res.status(404).json({"error": "This genre doesn't exist"});
        }
    }

    if (req.query.keyword){
        const mykeyword =  await MovieController.search(req.query.keyword);

        if(mykeyword){
            res.status(200).json(mykeyword);
        }
        else{
            res.status(404).json({"error": "This keyword doesn't match"});
        }
    }

    else {
        res.status(200).json(await MovieController.getAll());
    }
});



router.get('/movies/:id',async (req,res,next)=>{
    const movie = await MovieController.getById(req.params.id);
    if (movie){
        res.json(movie)
    }
    else {
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
    if(!req.body.title && !req.body.description && req.body.year){
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
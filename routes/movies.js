const MovieController = require ('../controllers').MovieController

let express = require('express');
let router = express.Router();

router.get('/movies',async (req, res, next) =>{
    res.json(await MovieController.getAll());
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
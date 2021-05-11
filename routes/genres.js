const GenreController = require ('../controllers').GenreController

let express = require('express');
let router = express.Router();

router.get('/genres', async (req,res,next)=>{
    if (req.query.name){
         res.json(await GenreController.getByName(req.query.name));
    }
})


module.exports = router;
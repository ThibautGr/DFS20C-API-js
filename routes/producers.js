const ProducerController = require('../controllers').ProducerController


let express = require('express');
let router = express.Router();

router.get('/producers',async (req, res, next) =>{
   res.json(await ProducerController.getAll());
});

router.get('/producers/:id',async (req,res,next)=>{
   const producer = await ProducerController.getById(req.params.id);
if (producer){
   res.json(producer)
}
else {
   res.status(404).json({"error" : "producer dosent existe"})
}

});

router.post('/producers', async (req, res, next) => {
   if (req.body.firstName && req.body.lastName) {
      const insertedProducer = await ProducerController.add(req.body);
      res.status(201).json(insertedProducer);
   } else {
      res.status(400).end();
   }
});

router.patch('/producers/:id',async (req, res, next)=>{
   if(!req.body.firstName && !req.body.lastName){
      res.status(400).end();
   }
   const UpdatedProducer = await  ProducerController.update(req.params.id,req.body)
   if (UpdatedProducer[0] === 1){
      res.json(await ProducerController.getById(req.params.id))
   }else {
      res.status(404).json({'error':"producer not found"})
   }
});

router.delete('/producers/:id', async (req, res, next)=>{
   const sucess = await ProducerController.delete(req.params.id);

   if (sucess){
      return res.status(204).end();
   }
   else {
      res.status(404).json({"error": "producer not found"});
   }
})

module.exports = router;
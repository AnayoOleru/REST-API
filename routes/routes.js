const express = require('express');
const router = express.Router();

// get a list of food
router.get('/foods', function(req, res){
    res.send({type:'GET'});
})

// add a new food 
router.post('/foods', function(req, res){
    console.log(req.body);
    res.send({ type:'POST' })
    });

// update a list of food
router.put('/foods/:id', function(req, res){
    res.send({type:'PUT'});
})

// delete a food
router.delete('/foods/:id', function(req, res){
    res.send({type:'DELETE'});
})

module.exports = router;

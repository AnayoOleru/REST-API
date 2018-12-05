const express = require('express');
const router = express.Router();
const Food = require('../controller/foodCont');

// get a list of food
router.get('/foods', Food.getAll);

// get one food
router.get('/foods/:id', Food.getOne);

// add a new food 
router.post('/foods', Food.create);

// update a list of food
router.put('/foods/:id', Food.update);

// delete a food
router.delete('/foods/:id', Food.delete);

module.exports = router;

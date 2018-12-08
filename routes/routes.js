const express = require('express');
const router = express.Router();
const Food = require('../controller/foodCont');
require('babel-polyfill');
const UserWithDb = require('../controller/UserCont');
const Auth = require('../validation/Auth');

// get a list of food
router.get('/foods', Auth.verifyToken, Food.getAll);

// get one food
router.get('/foods/:id', Auth.verifyToken, Food.getOne);

// add a new food 
router.post('/foods', Auth.verifyToken, Food.create);

// update a list of food
router.put('/foods/:id', Auth.verifyToken, Food.update);

// delete a food
router.delete('/foods/:id', Auth.verifyToken, Food.delete);

// new user can register
router.post('/users', UserWithDb.create);

// user can login
router.post('/users/login', UserWithDb.login);

//already registered user can be deleted 
router.delete('/users/me', UserWithDb.delete);

// ---------------------
// get a list of users: admin
router.get('/users', UserWithDb.getAll);

// get one user' details
router.get('/users/:ownerId', Auth.verifyToken, UserWithDb.getOne);

// edit current user details
router.put('/users/:ownerId');

// get all food made by a specific user
router.get('/food/:ownerId');

module.exports = router;

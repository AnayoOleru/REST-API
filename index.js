const express = require('express');
const bodyParser = require('body-parser');
require('babel-polyfill');
const UserWithDb = require('./controller/UserCont');
const Auth = require('./validation/Auth');

// setup express app
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1',require('./routes/routes'));

// app.get('/', function(req, res){
//     console.log('GET request');
//     res.send('name: Yoshi')
// });

// listen for request
app.listen(process.env.port || 4000, function(){
    console.log('now listening for request');
})
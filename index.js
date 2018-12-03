const express = require('express');
const bodyParser = require('body-parser');

// setup express app
const app = express();

app.use(bodyParser.json())

app.use('/api/v1',require('./routes/routes'));

// app.get('/', function(req, res){
//     console.log('GET request');
//     res.send('name: Yoshi')
// });

// listen for request
app.listen(process.env.port || 4000, function(){
    console.log('now listening for request');
})
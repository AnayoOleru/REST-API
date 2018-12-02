const express = require('express');

// setup express app
const app = express();

app.get('/', function(req, res){
    console.log('GET request');
    res.send('name: Yoshi')
});

// listen for request
app.listen(process.env.port || 4000, function(){
    console.log('now listening for request');
})
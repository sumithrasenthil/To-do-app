 //requiring a express
var express=require('express');
var app =express();
//setting up bodyParser


var todocounter=require('./controller/todocontroller');
//setting up view engine
app.set('view engine','ejs');
//setting up middleware
app.use(express.static('./public'));
//listening to port
 todocounter(app);
app.listen(3100);
console.log('The server start listening at a port 3100');
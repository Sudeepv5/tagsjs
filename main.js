var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Specifying directory
app.use(express.static(__dirname + '/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//Env Switching variables
var ipaddress =  '' || '127.0.0.1';
var port      =  '' || 3000;

app.get('/',function(req,res){
    res.json({message: "Houston, we have an API!"});
});


//Run
app.listen(port,function(){
    console.log("Firing from ",port);
})
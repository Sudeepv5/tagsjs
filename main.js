var express = require('express');
var bodyParser = require('body-parser');
var stemmer=require('stemmer');
var Tokenizer = require('tokenize-text');
var tokenize = new Tokenizer();
var app = express(),
	mongoose=require('mongoose');

//Specifying directory
app.use(express.static(__dirname + '/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//Env Switching variables
var ipaddress =  '' || '127.0.0.1';
var port      =  '' || 3000;
var connection= '' || 'mongodb://localhost:27017/test';

//CONNECTIONS
mongoose.connect(connection,function(err,db){
    if(err)
        console.log("DB connection failed!");
    else
        console.log("DB connection success!");
});

function Question(qres){
	this.body=qres.body;
	this.title=qres.title;
}

String.prototype.stem=function(){
	return stemmer(this);
};

String.prototype.stop=function(){
	return stops.indexOf(this) > -1;
};

Question.prototype.sanitize=function(){};
Question.prototype.tokenize=function(){
	return tokenize.words()(this.body+" "+this.title);
};


app.get('/',function(req,res){
    res.json({message: "Houston, we have an API!"});
});

app.get('/tags',function(req,res){
	var ques=new Question({body:"this is body",title:"this is title"});
	res.json({tokens:ques.tokenize()});
});


//Run
app.listen(port,function(){
    console.log("Firing from ",port);
})
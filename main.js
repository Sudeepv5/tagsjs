var express = require('express');
var bodyParser = require('body-parser');
var stemmer=require('stemmer');
var Tokenizer = require('tokenize-text');
var tokenize = new Tokenizer();
var app = express(),
	mongoose=require('mongoose'),
	util=require('./util'),
	Cooccurrence=require('./app/models/cooccurrence');

//Specifying directory
app.use(express.static(__dirname + '/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//Env Switching variables
var ipaddress =  '' || '127.0.0.1';
var port      =  '' || 3000;
var connection= '' || 'mongodb://localhost:27017/test';

//CONNECTIONS


function Index(){
	mongoose.connect(connection,function(err,db){
    if(err)
        console.log("DB connection failed!");
    else
        console.log("DB connection success!");
	});
}
Index.prototype.find=function(key){
	 Cooccurrence.find({key:key},function(err,data){
       if(err)
           res.send(err);
       res.json(data);
   });
}
var index=Index();



String.prototype.stem=function(){
	return stemmer(this);
};

String.prototype.stop=function(){
	return util.stops[this];
};



function Tags(){
	this.all={"javascript":-1,"c#":-1};
	//load all tags from db
}
Tags.prototype.score=function(tokens){

	for(var tag in this.all)
	{
		tokens.forEach(function(token){

		})
	}

}
Tags.prototype.sort=function(){

}
Tags.prototype.first=function(n){

}
var tags=new Tags();

function Question(qres){
	this.body=qres.body;
	this.title=qres.title;
}

Question.prototype.sanitize=function(){};
Question.prototype.tokenize=function(){
	var tokens=tokenize.words()(this.body+" "+this.title);
	return tokens.filter((x) => !x.value.stop()).map((x)=>x.value.stem());
};

Question.prototype.tags=function(){
	var tokens=this.tokenize();
	tags.score(tokens);
	tags.sort();
	var qTags=tags.first(3);
	return qTags;
};






app.get('/',function(req,res){
    res.json({message: "Houston, we have an API!"});
});

app.get('/tags',function(req,res){
	var ques=new Question({body:"this is 45t body 34 @#s playing does",title:"this is title"});
	res.json({"tags":ques.tags(),"body":ques.body,"title":ques.title});
});


//Run
app.listen(port,function(){
    console.log("Firing from ",port);
})
var express=require('express'),
	app=express(),
	mongoose=require('mongoose'),
	fs = require('fs'),
    readline = require('readline');

var Cooccurrence=require('./app/models/cooccurrence');

//Env Switching variables
var connection= '' || 'mongodb://localhost:27017/test';

//CONNECTIONS
mongoose.connect(connection,function(err,db){
    if(err)
        console.log("DB connection failed!");
    else
        console.log("DB connection success!");
});


var linereader = readline.createInterface({
    input: fs.createReadStream('file.txt'),
});
var count=0;
linereader.on('line', function (line) {
	var k=line.split(' ')[0],v=line.split(' ')[1];
	var entry=new Cooccurrence({key:k,value:v});
	entry.save();
    count++;
  	//console.log(entry);
});
console.log(count+" records added");

connection.disconnect();


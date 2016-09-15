var mongoose=require('mongoose');

var CoocurrenceSchema=new mongoose.Schema({
    key:String,
    value:Number
});

module.exports=mongoose.model('coocurrence',CoocurrenceSchema);
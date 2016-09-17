var mongoose=require('mongoose');

var CoocurrenceSchema=new mongoose.Schema({
    key: {type:String, index:true},
    value:Number
});

module.exports=mongoose.model('coocurrence',CoocurrenceSchema);
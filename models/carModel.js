const { Schema} = require('mongoose');
const mongoose = require('mongoose')

//Schema 
const memberSchema = new Schema({
    name:String,
    email:String
    
   });
   
module.exports=mongoose.model('Member', memberSchema);
  



const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    upvotes:{
        type:Number,
        required:true
    },
    comments:{
        type:Array,
        required:true
    }
})

const articleModel = mongoose.model("articles",articleSchema)

module.exports = articleModel
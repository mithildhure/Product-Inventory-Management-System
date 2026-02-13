const mongoose = require('mongoose');

const prodSchema = mongoose.Schema({
    pname : {
        type : String,
        lowercase : true,
        minlength : 3,
        required : true,
    },
    pimg : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        min : 100,
        required : true,
    },
    category : {
        type : String,
        enum : ["Food","Fashion","Electronics"],
        required : true
    },
    quantity : {
        type : Number,
        min : 5,
        max : 100,
        required : true
    },
    staffName : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
},{timestamps : true});

module.exports = mongoose.model("Product",prodSchema);
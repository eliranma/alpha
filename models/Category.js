const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,   
    },
    categoryId:{
        type:String,
    }

})
module.exports=mongoose.model('category', categorySchema)
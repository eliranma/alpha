const mongoose = require('mongoose');

const userOrderSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    products:{
        type: Map
    },
    email:{
        type:String,
        required:true
    },
    orderId:{
        type:Number,
        required:true
    }

})
module.exports=mongoose.model('UserOrder', userOrderSchema)
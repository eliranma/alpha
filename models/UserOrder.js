const mongoose = require('mongoose');

const userOrderSchema = mongoose.Schema({
    userId: {
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
        type: String,
        required:true
    },
    amount:{
        type:Number,
    },
    address:{
        type:String,
    },


})
module.exports=mongoose.model('UserOrder', userOrderSchema)
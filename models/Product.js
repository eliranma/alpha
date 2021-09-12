const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    price:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        default:'product'
    },
    count:{
        type:Number,
    },
    historyOrders:{
        type:Array
    },
    image:{
        type:String,
        default:'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
    },
    productId:{
        type:String,
    }

})
module.exports=mongoose.model('product', productSchema)
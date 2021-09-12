const express = require('express');
const { db } = require('../models/Product');
const Product = require('../models/Product');
const router = express.Router();



//Create New Product
router.post('/insertProduct', (req, res)=>{
    const product=new Product({
    productName: req.body.productName,
    description:req.body.description,
    price:req.body.price,
    type:req.body.type,
    numOfOrders:req.body.numOfOrders,
    historyOrders:req.body.historyOrders,
    image:req.body.image,
    productId:req.body.productId
})
    product.save()
    .then(product=>{
        res.status(200).json(product);
    })
    .catch(err=>{
        res.status(500).json({message:err})
    })

    res.send(product)

})
//Update A Product
router.post('/updateProduct',  (req, res)=>{
    const result =  Product.findOneAndUpdate({productId:req.body.productId},req.body,(err)=>err?console.log(err):console.log('updated succefuly') )
    .catch(err=>{
        res.status(500).json({message:err})
    })
    res.status(200).json(result)
})

//Delete One Product
router.delete('/deleteProduct/:productId', async (req, res)=>{
   const product= await Product.deleteOne({productId:req.params.productId})
    .catch(err=>{
        res.status(500).json({message:err})
    })

    res.send(product)

})
//Delete Many Products
router.delete('/deleteProducts/:productsIds', async(req, res)=>{
    const products  =await Product.deleteMany({productId:req.params.productId})
    .catch(err=>{
        res.status(500).json({message:err})
    })

    res.send(products)
})
// Get all Products
router.get('/products', async (req, res)=>{
    try{
        const products = await Product.find().limit(10);
        res.status(200).json(products);
    }
    
    catch(err){res.status(500).json({message:err})}

});
//Get Specific Product
router.get('/product/:productId', async (req, res)=>{
    try{
        const product = await Product.find({productId:req.params.productId});
        res.json(product);
    }
    
    catch(err){res.status(500).json({message:err})}

});
module.exports=router;

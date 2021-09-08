const express = require('express');
const UserOrder = require('../models/UserOrder');
const router = express.Router();

router.get('/getOrder', (req, res)=>{
    // var userName = req.body.userName;
    // var password = req.body.password;
    // var email = req.body.email;
    res.send("order")

})

router.post('/createNewOrder', (req, res)=>{
    const userOrder = new UserOrder({
        userName:req.body.userName,
        products:req.body.products,
        email:req.body.email,
        orderId:req.body.orderId
    })
    userOrder.save()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err=>{
        res.status(500).json({message:err})
    })

})
module.exports=router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'uploads/'})
const Product = require('../models/Product');
const path = require('path');
const csv = require('csvtojson');


//Import CSV file of Products
router.post("/uploadProducts", upload.single('file'), (req, res) => {
    //Upload A File
    
    const file = req.file;
    const fileName = file.filename;
    const size = file.size;
    const filePath = file.path
    const extension = path.extname(fileName)
    const allowedExtension = /csv/;
    (!allowedExtension.test(extension))?console.log('Unsopported File'):console.log("uploading File " + fileName)
    
    csv().fromFile(filePath)
    .then(async(jsonObj)=>{
    console.log(file)  
        Product.insertMany(jsonObj,(err)=>err?console.log(err):console.log('updated succefuly') )      
        console.log(jsonObj)
  })
  .catch(err=>{
    res.status(500).json({message:err})
})
res.status(200).json('well Done')
})
module.exports=router;
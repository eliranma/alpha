const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

//Create New category
router.post('/insertCategory', (req, res)=>{
    const category=new Category({
        categoryName:req.body.categoryName,
        description:req.body.description,
        image:req.body.image,
        categoryId:req.body.categoryId,
})
    category.save()
    .then(category=>{
        res.status(200).json(category);
    })
    .catch(err=>{
        res.status(500).json({message:err})
    })

    res.send(category)

})
//Update A category
router.post('/updateCategory',  (req, res)=>{
    const result =  category.findOneAndUpdate({categoryId:req.body.categoryId},req.body,(err)=>err?console.log(err):console.log('updated succefuly') )
    .catch(err=>{
        res.status(500).json({message:err})
    })
    res.status(200).json(result)
})

//Delete One category
router.delete('/deleteCategory/:categoryId', async (req, res)=>{
   const category= await category.deleteOne({categoryId:req.params.categoryId})
    .catch(err=>{
        res.status(500).json({message:err})
    })

    res.send(category)

})
//Delete Many categorys
router.delete('/deleteCategorys/:categoryiesIds', async(req, res)=>{
    const categorys  =await category.deleteMany({categoryId:req.params.categoryId})
    .catch(err=>{
        res.status(500).json({message:err})
    })

    res.send(categorys)
})
// Get all categorys
router.get('/categories', async (req, res)=>{
    try{
        const categories = await category.find().limit(10);
        res.status(200).json(categories);
    }
    
    catch(err){res.status(500).json({message:err})}

});
//Get Specific category
router.get('/category/:categoryId', async (req, res)=>{
    try{
        const category = await category.find({categoryId:req.params.categoryId});
        res.json(category);
    }
    
    catch(err){res.status(500).json({message:err})}

});
module.exports=router;

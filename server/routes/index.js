var express = require('express');
var router = express.Router();
const {dburl, MongoClient, mongodb, dbname} = require('../dbConfig');

/* GET home page. */
router.get('/', async(req, res) => {
  const client = await MongoClient.connect(dburl);
  try{
    const db = await client.db(dbname)
    let products = await db.collection('products').find().toArray()
    res.json({
      statusCode: 200,
      message: "Products Fetched successfully",
      data: products
    })
   
  }catch(error){
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error!"
    })

  }finally{
    client.close();
  }
});

//Get ID
router.get('/:id', async(req, res) => {
  const client = await MongoClient.connect(dburl);
  try{
    const db = await client.db(dbname)
    let products = await db.collection('products').findOne({_id: mongodb.ObjectId(req.params.id)})
    res.json({
      statusCode: 200,
      message: "Products Fetched successfully",
      data: products
    })
   
  }catch(error){
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error!"
    })

  }finally{
    client.close();
  }
});

//Delete
router.delete('/:id', async(req, res) => {
  const client = await MongoClient.connect(dburl);
  try{
    const db = await client.db(dbname)
    let products = await db.collection('products').deleteOne({_id: mongodb.ObjectId(req.params.id)})
    res.json({
      statusCode: 200,
      message: "Products Deleted successfully",
      data: products
    })
   
  }catch(error){
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error!"
    })

  }finally{
    client.close();
  }
});

//PUT
router.put('/:id', async(req,res)=>{
  const client = await MongoClient.connect(dburl);
  try{
    const db = await client.db(dbname)
    let products = await db.collection('products').findOneAndReplace({prodcutName: req.body.prodcutName},req.body)
    res.json({
      statusCode: 200,
      message: "Product Edited Successfully"
    })
  }catch(error){
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error!"
    })
  }finally{
    client.close();
  }
})

//Post
router.post('/', async(req,res)=>{
  const client = await MongoClient.connect(dburl);
  try{
    const db = await client.db(dbname)
    let products = await db.collection('products').findOne({prodcutName: req.body.prodcutName})
    if(products){
      res.json({
        statusCode: 400,
        message: "Product Already Exit"
      })
    }else{
      const products = await db.collection('products').insertOne(req.body)
      res.json({
        statusCode: 200,
        message: "Product Added Successfully",
        data: products
      })
    }
  }catch(error){
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error!"
    })

  }finally{
    client.close();
  }
})

module.exports = router;

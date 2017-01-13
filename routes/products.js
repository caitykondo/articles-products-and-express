const express = require('express');
const productsDB = require('../db/products');
let router = express.Router();

let productList = productsDB.productList;

let newProductId = 1;

router.post('/', (req, res) => {
  let productObj = req.body;

  if(productObj.name && productObj.price && productObj.inventory){
    productObj.id = newProductId;

    newProductId++;

    productList.push(productObj);
    // If successful then redirect the user back to the /products route.
    // res.redirect('/products/');

    res.send(productList);
  }else{
    // If not successful then send the user back to the new article route,
    // /products/new and some way to communicate the error back to the user via templating.
    res.send('ERROR');
    // res.redirect('/products/new');
  }


});

router.put('/:id', (req, res) => {

  let requestId = parseInt(req.params.id);


  // find the product by requestId
  for(let i = 0; i < productList.length; i++){
    if(productList[i].id === requestId){

      // set this products value to new value

      // check if has name
      if(req.body.name){
        productList[i].name = req.body.name;
        console.log('A NAME');
      }
      // check if has price
      if(req.body.price){
        productList[i].price = req.body.price;
        console.log('A price');
      }
      // check if has inventory
      if(req.body.inventory){
        productList[i].inventory = req.body.inventory;
        console.log('A inventory');
      }
    }
  }
  res.send('OKAY');

});


module.exports = router;
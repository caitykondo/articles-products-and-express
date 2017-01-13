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
      }
      // check if has price
      if(req.body.price){
        productList[i].price = req.body.price;
      }
      // check if has inventory
      if(req.body.inventory){
        productList[i].inventory = req.body.inventory;
      }

    //  If successful then redirect the user back to the /products/:id route
    // where :id is the product that was just edited, so that they can see the updated resource.
      res.redirect('/products/:id');

    //  If not successful then send the user back to the new article route,
    // /products/:id/edit and some way to communicate the error back to the user via templating.
      // res.redirect('/products/:id');
    }
  }
  res.send('OKAY');

});

router.delete('/:id', (req, res) => {
  let requestId = parseInt(req.params.id);

  for(let i = 0; i < productList.length; i++){
    if(productList[i].id === requestId){
      productList.splice(i, 1);
      // redirect the user back to the /products page and some way to communicate to the user that this action was successful.
    }
    // not successful then send the user back to the new article route, /products/:id,
    // where :id is the product that was just edited and a message that this action was unsucessful.
  }
  res.send(productList);

});


module.exports = router;
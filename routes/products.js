const express = require('express');
const productsDB = require('../db/products');
let router = express.Router();

let productList = productsDB.productList;

let data = {
  "products": productList
};

function createNewProduct(product) {
  product.id = productsDB.newProductId;
  productsDB.newProductId++;
  productList.push(product);

}

let productMatch = '';

function findProductById(requestId){
  for(let i = 0; i < productList.length; i++){
    if(productList[i].id === requestId){
      productMatch = i;
      return true;
    }else{
      return false;
    }
  }
}


router.post('/', (req, res) => {
  let productObj = req.body;

  if(productObj.name && productObj.price && productObj.inventory){
    createNewProduct(productObj);
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
    if(findProductById(requestId)){

      // check if has name
      if(req.body.name){
        productList[productMatch].name = req.body.name;
      }
      // check if has price
      if(req.body.price){
        productList[productMatch].price = req.body.price;
      }
      // check if has inventory
      if(req.body.inventory){
        productList[productMatch].inventory = req.body.inventory;
      }

    //  If successful then redirect the user back to the /products/:id route
    // where :id is the product that was just edited, so that they can see the updated resource.
      // res.redirect(303, '/products/:id');

    //  If not successful then send the user back to the new article route,
    // /products/:id/edit and some way to communicate the error back to the user via templating.
      // res.redirect('/products/:id');
  }
  else{
    res.send('NOT OKAY');
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

router.get('/', (req, res) => {
  res.render('./products/index', data);
});


module.exports = router;
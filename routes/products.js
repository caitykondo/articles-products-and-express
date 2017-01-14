const express = require('express');
const productsDB = require('../db/products');
let router = express.Router();

let productList = productsDB.productList;


router.post('/', (req, res) => {
  let productObj = req.body;

  if(productObj.name && productObj.price && productObj.inventory){
    productsDB.addNewProduct(productObj);
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

  let productToEdit = productsDB.findProductById(requestId);

  // check if has name
  if(req.body.name){
    productToEdit.name = req.body.name;
  }
  // check if has price
  if(req.body.price){
    productToEdit.price = req.body.price;
  }
  // check if has inventory
  if(req.body.inventory){
    productToEdit.inventory = req.body.inventory;
  }

    //  If successful then redirect the user back to the /products/:id route
    // where :id is the product that was just edited, so that they can see the updated resource.
      // res.redirect(303, '/products/:id');

    //  If not successful then send the user back to the new article route,
    // /products/:id/edit and some way to communicate the error back to the user via templating.
      // res.redirect('/products/:id');
  res.end();
});

router.delete('/:id', (req, res) => {
  let requestId = parseInt(req.params.id);
  productsDB.deleteProduct(requestId);
  res.send(productList);
});


router.get('/', (req, res) => {
  res.render('./products/index', productsDB.data);
});

router.get('/:id', (req, res) => {
  let requestId = parseInt(req.params.id);
  let productRequested = productsDB.findProductById(requestId);
  let i = productList.indexOf(productRequested);
  res.render('./products/product', productsDB.data.products[i]);
});


module.exports = router;
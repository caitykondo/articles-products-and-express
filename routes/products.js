const express = require('express');
const productsDB = require('../db/products');
let router = express.Router();
let productList = productsDB.productList;


router.post('/', (req, res) => {
  let productObj = req.body;

  if(productObj.name && productObj.price && productObj.inventory){
    productsDB.addNewProduct(productObj);
    productsDB.data.success.post = true;
    res.redirect('/products');
  }else{
    res.redirect('/products/new');
    productsDB.data.success.post = false;
  }
});

router.put('/:id', (req, res) => {
  let requestId = parseInt(req.params.id);
  let productToEdit = productsDB.findProductById(requestId);

  if(productToEdit !== undefined){
    productsDB.editProduct(productToEdit, req);
    res.redirect(303, `/products/${productToEdit.id}`);
  }else {
    res.redirect(303, '/products/new');
  }
});

router.delete('/:id', (req, res) => {
  let requestId = parseInt(req.params.id);
  let productToEdit = productsDB.findProductById(requestId);
  if(productToEdit){
    productsDB.deleteProduct(requestId);
    productsDB.data.success.delete = true;
    res.redirect(303,'/products');
  }else{
    res.redirect(303,'/products/error');
  }
});


router.get('/', (req, res) => {
  res.render('./products/index', productsDB.data);
  // productsDB.data.success.delete = false;
});

router.get('/new', (req, res) => {
  res.render('./products/new', productsDB.data);
});

router.get('/:id', (req, res) => {
  let requestId = parseInt(req.params.id);
  let productRequested = productsDB.findProductById(requestId);
  if(productRequested){
    let i = productList.indexOf(productRequested);
    res.render('./products/product', productsDB.data.products[i]);
  }else{
    res.redirect(303, '/products/error');
  }
});

router.get('/:id/edit', (req, res) => {
  let requestId = parseInt(req.params.id);
  let productRequested = productsDB.findProductById(requestId);
  if(productRequested){
    let i = productList.indexOf(productRequested);
    res.render('./products/edit', productsDB.data.products[i]);
  }else{
    res.redirect(303, '/products/error');
  }
});


module.exports = router;
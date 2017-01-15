const express = require('express');
const productsDB = require('../db/products');
let router = express.Router();
let productList = productsDB.productList;



router.post('/', (req, res) => {
  let productObj = req.body;

  if(productObj.name && productObj.price && productObj.inventory){
    productsDB.addNewProduct(productObj);
    productsDB.data.error = false;
    res.redirect('/products');
  }else{
    productsDB.data.error = true;
    res.redirect('/products/new');
  }
});

router.put('/:id', (req, res) => {
  console.log(req.body);
  let requestId = parseInt(req.params.id);

  let productToEdit = productsDB.findProductById(requestId);
  if(productToEdit !== undefined){
    productsDB.editProduct(productToEdit, req);
    res.redirect(303, `/products/${productToEdit.id}`);
  }
  else {
    res.redirect(303, '/products/new');
  }
    //  If not successful then send the user back to the new article route,
    // /products/:id/edit and some way to communicate the error back to the user via templating.
      // res.redirect('/products/:id');
  // res.send('done');
});

router.delete('/:id', (req, res) => {
  let requestId = parseInt(req.params.id);
  productsDB.deleteProduct(requestId);
  res.send(productList);
});


router.get('/', (req, res) => {
  res.render('./products/index', productsDB.data);
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

// router.post('/:id', (req, res) => {
//   let requestId = parseInt(req.params.id);

//   let productToEdit = productsDB.findProductById(requestId);
//   if(productToEdit !== undefined){
//     productsDB.editProduct(productToEdit, req);
//     res.redirect(303, `/products/${productToEdit.id}`);
//   }
// });

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
const express = require('express');
const productsDB = require('../db/products');
let router = express.Router();

let productList = productsDB.productList;

router.post('/', (req, res) => {
  productList.push(req.body);
  res.send(productList);

});

module.exports = router;
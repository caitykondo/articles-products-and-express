const express = require('express');
const db = require('./../db.js');
let router = express.Router();

router.route('/')
  .get((req, res) => {
    db.any('SELECT * FROM products')
    .then( products => {
      res.render('./products/', {products});
    })
    .catch(err =>{
      res.render('./products/', {error: true});
    });
  })
  .post( (req, res) => {
    let productObj = req.body;
    let query = `INSERT INTO products( name, price, inventory) VALUES ('${productObj.name}', ${productObj.price}, ${productObj.inventory});`;
    if(productObj.name && productObj.price && productObj.inventory){
      db.none(query)
      .then(result => {
        res.redirect('/products');
      })
      .catch(err => {
        res.render('./products/new', {post_err: true});
      });
    }else{
      res.render('./products/new', {incomplete_err: true});
    }
  });

function updateProductQuery(product, requestId){
  let query = '';
  if (product.name){
    query += `name = '${product.name}'`;
  }
  if (product.price){
    query += `, price = '${product.price}'`;
  }
  if (product.inventory){
    query += `, inventory = '${product.inventory}'`;
  }
  return `UPDATE products SET ${query} WHERE id = ${requestId} RETURNING *;`;
}

router.route('/new')
  .get((req, res) => {
    res.render('./products/new');
  });

router.route('/:id')
  .get((req, res) => {
    let requestId = parseInt(req.params.id);
    let query = `SELECT * FROM products WHERE id = ${requestId}`;

    db.one(query)
    .then(product => {
      res.render('./products/product', product);
    })
    .catch(err => {
      res.render('./products/product', {error: true});
    });
  })
  .put((req, res) => {
    let requestId = parseInt(req.params.id);
    let query = updateProductQuery(req.body, requestId);

    db.one(query)
    .then(product => {
      res.render('./products/product', product);
    })
    .catch(err => {
      res.render('./products/edit', {error: true});
    });
  })
  .delete((req, res) => {
    let requestId = parseInt(req.params.id);
    let query = `DELETE FROM products WHERE id = ${requestId};`

    db.any(query)
    .then(product => {
      res.redirect(303, '/products');
    })
    .catch(err => {
      res.render('./products', {delete_error: true});
    });
  });

router.route('/:id/edit')
  .get((req, res) => {
    let requestId = parseInt(req.params.id);
    let query = `SELECT * FROM products WHERE id = ${requestId};`;

    db.one(query)
    .then(product => {
      res.render('./products/edit', product);
    })
    .catch(err => {
      res.redirect(303, `/products/${requestId}`);
    });
  });

module.exports = router;
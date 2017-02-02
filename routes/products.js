const express = require('express');
const db = require('./../db.js');
let productQueries = require('./../productQueries.js');
let router = express.Router();


router.route('/')
  .get((req, res) => {
    productQueries.getIndex
    .then( products => {
      res.render('./products/', {products});
    })
    .catch(err =>{
      res.render('./products/', {error: true});
    });
  })
  .post( (req, res) => {
    if(req.body.name && req.body.price && req.body.inventory){
      productQueries.postIndex(req.body)
      .then(result => {
        res.redirect('/products');
      })
      .catch(err => {
        res.render('./products/new', {post_error: true});
      });
    }else{
      res.render('./products/new', {incomplete_error: true});
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
    productQueries.getId(parseInt(req.params.id))
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
      console.log(product);
      res.render('./products/product', product);
    })
    .catch(err => {
      res.render('./products/edit', {error: true});
    });
  })
  .delete((req, res) => {
    let requestId = parseInt(req.params.id);
    let query = `DELETE FROM products WHERE id = ${requestId};`

    db.none(query)
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
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
    productQueries.putId(req.body, parseInt(req.params.id))
    .then(product => {
      res.render('./products/product', product);
    })
    .catch(err => {
      res.render('./products/edit', {error: true});
    });
  })
  .delete((req, res) => {
    productQueries.deleteId(parseInt(req.params.id))
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
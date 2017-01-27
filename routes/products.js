const express = require('express');
const productsDB = require('../db/products');
let router = express.Router();
let productList = productsDB.productList;

const pgp = require('pg-promise')();
const PG_PASS = process.env.PG_PASS;

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'articles_products_express',
  user: 'admin',
  password: PG_PASS
});

router.route('/')
  .get((req, res) => {
    db.any('SELECT * FROM products')
    .then( products => {
      res.render('./products/index', {products});
    })
    .catch(err =>{
      res.render('./products/error');
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
        res.send('One of your values is invalid!');
      });
    }else{
      res.redirect('/products/new');
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

router.route('/:id')
  .get((req, res) => {
    let requestId = parseInt(req.params.id);
    let query = `SELECT * FROM products WHERE id = ${requestId}`;

    db.one(query)
    .then(product => {
      res.render('./products/product', product);
    })
    .catch(err => {
      // doesnt exist
      res.redirect(303, '/products');
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
      res.redirect(303, '/products/edit', product);
    });
  })
  .delete((req, res) => {
    let requestId = parseInt(req.params.id);
    let query = `DELETE FROM products WHERE id = ${requestId};`

    db.any(query)
    .then(product => {
      res.redirect('/products');
    })
    .catch(err => {
      res.redirect(303, `/products/${requestId}`);
    });
  });

router.route('/:id/edit')
  .get((req, res) => {
    let requestId = parseInt(req.params.id);
    let query = `SELECT * FROM products WHERE id = ${requestId}`;

    db.one(query)
    .then(product => {
      res.render('./products/edit', product);
    })
    .catch(err => {
      res.redirect(303, `/products/${requestId}`);
    });
  });

router.route('/new')
  .get((req, res) => {
    res.render('./products/new', productsDB.data);
  });



module.exports = router;
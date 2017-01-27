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
  return `UPDATE products SET ${query} WHERE id = ${requestId};`;
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
      res.redirect(303, '/products');
    });

    // UPDATE ONLY product SET name = newName;
    // let productToEdit = productsDB.findProductById(requestId);

    // if(productToEdit !== undefined){
    //   productsDB.editProduct(productToEdit, req);
    //   res.redirect(303, `/products/${productToEdit.id}`);
    // }else {
    //   res.redirect(303, '/products/new');
    // }
  })
  .delete((req, res) => {
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



router.get('/new', (req, res) => {
  res.render('./products/new', productsDB.data);
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
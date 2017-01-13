const express = require('express');
const app = express();

let articles = require('./routes/articles');
let products = require('./routes/products');

app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/products', products);
app.use('/articles', articles);



module.exports = app;
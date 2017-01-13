const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let articles = require('./routes/articles');
let products = require('./routes/products');

app.get('/', (req, res) => {
  res.send('hello');
});

app.use(bodyParser.urlencoded({extended: false}));

app.use('/products', products);
app.use('/articles', articles);



module.exports = app;
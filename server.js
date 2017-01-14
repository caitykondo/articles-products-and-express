const express = require('express');
const handlebars  = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

const hbs = handlebars.create({
  extname: 'hbs',
  defaultLayout: 'app'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

let articles = require('./routes/articles');
let products = require('./routes/products');

// let data = {
//   "products": products.productList
// };

app.use(express.static('./'));

app.use(bodyParser.urlencoded({extended: false}));

app.use('/products', products);
app.use('/articles', articles);

module.exports = app;
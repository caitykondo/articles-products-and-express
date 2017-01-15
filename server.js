const express = require('express');
const handlebars  = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

const hbs = handlebars.create({
  extname: 'hbs',
  defaultLayout: 'app'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

let articles = require('./routes/articles');
let products = require('./routes/products');

app.use(express.static('./'));

app.use(bodyParser.urlencoded({extended: false}));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


app.use('/products', products);
app.use('/articles', articles);

module.exports = app;
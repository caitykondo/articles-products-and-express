const express = require('express');
const app = express();

let articles = require('./routes/articles');
let products = require('./routes/products');



module.exports = app;
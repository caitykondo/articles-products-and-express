const db = require('./db');

let productQueries = {
  getIndex : db.any('SELECT * FROM products'),
  postIndex : (product) => db.any(`INSERT INTO products( name, price, inventory) VALUES ('${product.name}', ${product.price}, ${product.inventory});`),
  getId : (id) => db.one(`SELECT * FROM products WHERE id = ${id}`)
}

module.exports = productQueries;
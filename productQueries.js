const db = require('./db');

let productQueries = {
  getIndex : db.any('SELECT * FROM products'),
  postIndex : (product) => db.any(`INSERT INTO products( name, price, inventory) VALUES ('${product.name}', ${product.price}, ${product.inventory});`),
  getId : (id) => db.one(`SELECT * FROM products WHERE id = ${id}`),
  putId : (product, id) => {
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
    return db.one(`UPDATE products SET ${query} WHERE id = ${id} RETURNING *;`);
  },
  deleteId : (id) => db.none(`DELETE FROM products WHERE id = ${id};`)
}

module.exports = productQueries;
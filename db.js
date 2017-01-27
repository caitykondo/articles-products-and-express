const pgp = require('pg-promise')();
const PG_PASS = process.env.PG_PASS;

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'articles_products_express',
  user: 'admin',
  password: PG_PASS
});

module.exports = db;
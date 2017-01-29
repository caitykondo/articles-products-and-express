DROP DATABASE IF EXISTS articles_products_express;


CREATE USER admin WITH ENCRYPTED PASSWORD 'password100';
CREATE DATABASE "articles_products_express" WITH OWNER admin;


\c articles_products_express


DROP TABLE IF EXISTS products;

CREATE TABLE "products" (
  id serial PRIMARY KEY,
  name text,
  price integer,
  inventory integer
);

DROP TABLE IF EXISTS articles;

CREATE TABLE "articles" (
  id serial PRIMARY KEY,
  title text,
  body text,
  author text,
  url_title text
);

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;
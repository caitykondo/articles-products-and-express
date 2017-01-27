DROP DATABASE IF EXISTS "articles_products_express";


CREATE USER admin WITH ENCRYPTED PASSWORD 'password100';
CREATE DATABASE articles_products_express WITH OWNER admin;

CREATE TABLE "products" (
  id serial PRIMARY KEY,
  name text,
  price integer,
  inventory integer
);
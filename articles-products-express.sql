DROP DATABASE IF EXISTS articles_products_express;


CREATE USER admin WITH ENCRYPTED PASSWORD 'password100';
CREATE DATABASE articles_products_express WITH OWNER admin;

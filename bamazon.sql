DROP DATABASE IF EXISTS Bamazon;

CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_description VARCHAR(255),
    department_name VARCHAR(255),
    price DECIMAL(10,2),
    stock_quantity INTEGER
);

INSERT INTO products (product_name, product_description, department_name, price, stock_quantity)
VALUES ('Boombox', 'Broken left-half', 'Electronics', 14.49, 18);

INSERT INTO products (product_name, product_description, department_name, price, stock_quantity)
VALUES ('Cotton Swabs', 'Lightly used', 'Personal Care', 1.24, 48);

INSERT INTO products (product_name, product_description, department_name, price, stock_quantity)
VALUES ('Lawn Chair', 'Made with actual grass', 'Outdoor Furniture', 24.99, 27);

INSERT INTO products (product_name, product_description, department_name, price, stock_quantity)
VALUES ('Stuffed Polar Bear', 'Brown variation', 'Toys', 9.99, 13);

INSERT INTO products (product_name, product_description, department_name, price, stock_quantity)
VALUES ('Lip Balm', 'Salt-based', 'Personal Care', 2.49, 30);

INSERT INTO products (product_name, product_description, department_name, price, stock_quantity)
VALUES ('Bath Bomb', 'Military-grade', 'Personal Care', 6.50, 20);

INSERT INTO products (product_name, product_description, department_name, price, stock_quantity)
VALUES ('Oil Paint', 'Water-based', 'Arts and Crafts', 3.00, 40);

INSERT INTO products (product_name, product_description, department_name, price, stock_quantity)
VALUES ('Projector', 'My mother-in-law', 'Electronics', 50, 8);



SELECT * FROM products;
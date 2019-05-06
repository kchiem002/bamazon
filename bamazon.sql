CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);


USE bamazon_db;
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES 
(003, "All-Clad Stainless Steel Frying Pan 13", "Cookware", 200, 50),
(004, "Pokemon Pikachu Plush", "Toys", 20, 50),
(005, "Aveeno Daily Moisturizer", "Beauty", 15, 100),
(006, "NyQuil Nighttime Cough Syrup", "Pharmacy", 350, 140),
(007, "Cinnamon Toast Crunch Cereal", "Food", 6, 500),
(008, "Desk Calendar 2020", "Office Supply", 10, 300),
(009, "Tide Laundry Detergent", "Household", 25, 400),
(010, "Listerine Mouthwash", "Personal Hygeine", 8, 400),
(011, "Pillowcases - Set of 4", "Bedding", 16, 300);




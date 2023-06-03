CREATE TABLE users (
	id	serial PRIMARY KEY,
	name	varchar(80)  NOT NULL,
	email	varchar(100)  NOT NULL
);

CREATE TABLE categories (
	id	serial PRIMARY KEY,
	name	text  NOT NULL
);

CREATE TABLE products (
	id	serial PRIMARY KEY,
	name	varchar(80)  NOT NULL,
	price	money  NOT NULL,
	category int references categories(id)
);

CREATE TABLE orders (
	id	serial PRIMARY KEY,
	user_id	int references users(id),
	product_id	int references products(id),
	quantity int NOT NULL,
	created_at timestamp  NOT NULL
);

INSERT INTO categories (id, name) VALUES
	(1, 'Electronics'),
	(2, 'Garden tools'),
	(3, 'Kitchen'),
	(4, 'Gamming');

INSERT INTO users (id, name, email) VALUES
	(1, 'USER1', 'USER1@gmail.com'),
	(2, 'USER2', 'USER2@gmail.com'),
	(3, 'USER3', 'USER3@gmail.com');

INSERT INTO products (id, name, price, category) VALUES
	(3, 'Whistling Kettle', '$199.00', 3),
	(4, 'keyboard', '$100.00', 1),
	(5, 'mouse', '$50.00', 1),
	(6, 'electronic kettle', '$45.56', 1);

INSERT INTO orders (id, user_id, product_id, quantity, created_at) VALUES
	(3, 1, 3, 2, '2016-06-22 19:10:25'),
	(4, 1, 4, 4, '2016-07-02 12:10:25'),
	(6, 2, 6, 2, '2017-08-12 19:50:00'),
	(5, 2, 5, 2, '2017-08-12 09:50:00'),
	(7, 2, 3, 1, '2017-08-12 19:50:00'),
	(8, 2, 4, 3, '2017-08-12 19:50:00');

SELECT name, email, total FROM (
	SELECT user_id, sum(summ) as total FROM (
		SELECT user_id, count(*) as orders, sum(quantity * products.price) as summ FROM orders 
		JOIN products on product_id = products.id
		WHERE products.category = 1 
		GROUP BY user_id
	) as counter
	WHERE counter.orders >= 3
	GROUP BY user_id
) as totally
JOIN users on user_id = users.id
WHERE totally.total::numeric::int > 1000

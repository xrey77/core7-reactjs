CREATE TABLE core7.dbo.users (
	id int IDENTITY(0,1) NOT NULL,
	lastname varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	firstname varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	email varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	mobile varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	username varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	password varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	isactivated int DEFAULT 0 NULL,
	otp int DEFAULT 0 NULL,
	[role] varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT 'User' NULL,
	profilepic varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	isblocked int DEFAULT 0 NULL,
	twofactorenabled bit DEFAULT 0 NULL,
	qrcodeurl varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	mailtoken int DEFAULT 0 NULL,
	secretkey varchar(400) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	createdat datetime DEFAULT getdate() NULL,
	updatedat datetime NULL,
	otpactivation datetime NULL,
	otpexpiration datetime NULL,
	CONSTRAINT id PRIMARY KEY (id)
);

CREATE TABLE core7.dbo.products (
	id int IDENTITY(0,1) NOT NULL,
	prod_name varchar(100)  COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	prod_desc varchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	prod_stockqty decimal(38,2) NULL,
	prod_unit varchar(100)  COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	prod_cost decimal(38,2) NULL,
	prod_sell decimal(38,2) NULL,
	prod_pic varchar(100) NULL,
	prod_category varchar(100) NULL,
	prod_saleprice decimal(38,2) NULL,
	created_at datetime DEFAULT getdate() NULL,
	updated_at datetime NULL,
	userid int NULL,
	CONSTRAINT products_PK PRIMARY KEY (id)
);

INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(1'Laptop',	        'Macbook Pro Laptop',	                                        100,	'UNITS',	300.0,	310.0,	'http://localhost:5006/resources/products/prod6.jpg',	'Laptop',	        5000.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Desktop',	        'Acer Desktop Computer Sample 1',	                            110,	'UNITS',	320.0,	325.0,	'http://localhost:5006/resources/products/prod8.jpg',	'Desktop',	        5006.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Laptop	Alienware', 'Laptop Sample 2',	                                            120,	'UNITS',	330.0,	335.0,	'http://localhost:5006/resources/products/prod9.jpg',	'Laptop',           9000.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES('Kungfu Shoes',	    'Black leather Kungfu shoes',	                                190,	'PAIRS',	500.0,	550.0,	'http://localhost:5006/resources/products/prod16.jpg',	'Kungfu Shoes',	    3000.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Taekwondo Uniform','Taekwondo Uniform Yellow Color size, medium, small, large',    200,	'SETS',     233.0,	260.0,	'http://localhost:5006/resources/products/prod12.jpg',	'Taekwondo Shoes',  2200.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Compass',	        'POWERHOUSE Compass 12" with PVC Handle',	                    100,	'PCS',	    300.0,	360.0,	'http://localhost:5006/resources/products/sale1.jpg',	'sale',             120.0);
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Underwear',	    'Push up bra wonder bra sexy comportable underwear',            433,	'PCS',	    310.0,	320.0,	'http://localhost:5006/resources/products/sale2.jpg',	'sale',             60.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Backpack',	        'Shirty POLAQI Large Backpack for men and women',	            543,    'PCS',      400.0,  420.0,  'http://localhost:5006/resources/products/sale4.jpg',	'sale',             15.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Slippers',	        'Hot flip flop slipper Fashion Flat Korean Sandals ro Wemens',	343,	'PCS',	    300.0,	310.0,	'http://localhost:5006/resources/products/sale3.jpg',	'sale',             75.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Sexy Dress',	    'Best Seller, Elegant Long slit sexy dress (medium size)',      3434,   'PCS',	    200.0,	210.0,	'http://localhost:5006/resources/products/sale5.jpg',	'sale',             250.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Shovel',	        'Steel Shovel ROUND POINTED, SQUARE sold per piece',	        545,	'PCS',	    333.0,	340.0,	'http://localhost:5006/resources/products/sale6.jpg',	'sale',             249.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Bluetooth',	    'TZUZL S109 Bluetooth Headset 5.0 Wireless Earcphone',	        434,	'PCS',	    555.0,	600.0,	'http://localhost:5006/resources/products/sale7.jpg',	'sale',             240.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Sexy Dress',	    'Sexy Lingerie for Women, underwire bra Push up Brasier',	    3434,	'PCS',	    323.0,	326.0,	'http://localhost:5006/resources/products/sale8.jpg',	'sale',             230.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Laptop	Acer',      'Laptop Computer 3',	                                        33,	    'UNTIS',	56.0,	634.0,	'http://localhost:5006/resources/products/prod4.jpg',	'laptop',           5000.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Guitar',	        'Lumanog Guitar different styles',                              270,	'PCS',      3000.0,	4000.0, 'http://localhost:5006/resources/products/prod23.jpg',	'Guitar',            2040.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Guns',	            '45 caliber gun',	                                            220,	'PCS',	    1000.0, 2000.0,	'http://localhost:5006/resources/products/prod19.jpg',	'Guns',             10000.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Car Toyota',	    'Toyota Car Black complete accessories',	                    230,	'UNITS',	3000.0, 5000.0, 'http://localhost:5006/resources/products/prod20.jpg',	'Car Toyota',       900000.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Car Honda',	    'Hondata Car Black, White complete accessories'	,               240,	'UNITS',	5000.0,	1000.0,	'http://localhost:5006/resources/products/prod21.jpg',	'Car Honda',        1000000.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Tshirt',	        'Smiley round neck over size t-shirt for women',	            2323,	'PCS',	    234.0,	250.0,	'http://localhost:5006/resources/products/sale9.jpg',	'sale',             249.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Cap',	            '2PAC sumbrero cap for women and women Basesball cap',          344,	'PCS',      234.0,  240.0,	'http://localhost:5006/resources/products/sale10.jpg',	'sale',             220.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Slippers',	        'Sesame Street slippers slide flipflop rubber new design',	    454,	'PCS',	    535.0,	540.0,	'http://localhost:5006/resources/products/sale11.jpg',	'sale',             235.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Saddle',           'Bicycle	In-speed bike bycycle saddle slim design sof',	    543,	'PCS',      323.0,  330.0,	'http://localhost:5006/resources/products/sale12.jpg',	'sale',             200.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Desktop',	        'Acer Desktop Computer Sample 2',	                            130,	'UNITS',	100.0,	120.0,	'http://localhost:5006/resources/products/prod10.jpg',	'Destop',           4000.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Pants',	        'Pants Sizes, 28, 29, 30, 31, 32',	                            140,    'PCS',      150.0,  160.0,	'http://localhost:5006/resources/products/prod25.jpg',	'Pants',            1000.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Car',              'Mercedez Bench	Mercedez Bench Car Red, Black sports complete',	250,	'UNITS',	1000.0,	2000.0,	'http://localhost:5006/resources/products/prod22.jpg',	'Car Mercedez Bench',0000.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES('Katana Sword',     'Durable authentic katana sword',260,'PCS',3000.0, 5000.0, 'http://localhost:5006/resources/products/prod11.jpg', 'Katana,Sword',     1800.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Weapons',	        'Nunchucks Weapon',	                                            210,    'PCS',	    123.0,	130.0,	'http://localhost:5006/resources/products/prod18.jpg',	'Weapons',          2300.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Laptop',	        'Macbook Air Laptop',	                                        352,	'UNITS',    44.0,   343.0,	'http://localhost:5006/resources/products/prod5.jpg',	'laptop',           3000.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES('Desktop',	        'Imac Desktop computer',	                 341,'UNITS',55.0,545.0,'http://localhost:5006/resources/products/prod7.jpg','desktop',4500.0)

INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Boxing Shoes',	    'Everlast Boxing Shoes'	,                                       170,	'PAIRS',    120.0,	126.0,  'http://localhost:5006/resources/products/prod13.jpg',	'Boxing Shoes',     2000.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Taekwondo Shoes',	'Taekondo shoes Adidas white, black color',	                    180,	'PAIRS',	400.0,	500.0,  'http://localhost:5006/resources/products/prod24.jpg',	'Taekwondo Shoes',  2100.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Costume',	        'Jazz Show Pants',                                              150,	'PCS',      140.0,  145.0,  'http://localhost:5006/resources/products/prod14.jpg', 'Costume',	        1500.0)
INSERT INTO products(prod_name,prod_desc,prod_stockqty,prod_unit,prod_cost,prod_sell,prod_pic,prod_category,prod_saleprice) VALUES(	'Sports',	        'Winter Shoes',	                                                160,	'PCS',	    130.0,	135.0,	'http://localhost:5006/resources/products/prod17.jpg', 'Sports',           900.0)


CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(30) NOT NULL,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sales` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `sales_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sales_products` (
	`product_id` int NOT NULL,
	`sale_id` int NOT NULL,
	CONSTRAINT `sales_products_product_id_sale_id_pk` PRIMARY KEY(`product_id`,`sale_id`)
);
--> statement-breakpoint
ALTER TABLE `sales_products` ADD CONSTRAINT `sales_products_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sales_products` ADD CONSTRAINT `sales_products_sale_id_sales_id_fk` FOREIGN KEY (`sale_id`) REFERENCES `sales`(`id`) ON DELETE cascade ON UPDATE no action;
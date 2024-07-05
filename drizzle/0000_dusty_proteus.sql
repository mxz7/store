CREATE TABLE `invites` (
	`id` text PRIMARY KEY NOT NULL,
	`label` text,
	`created_at` integer NOT NULL,
	`used_by` text,
	FOREIGN KEY (`used_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `uploads` (
	`id` text PRIMARY KEY NOT NULL,
	`label` text,
	`created_at` integer NOT NULL,
	`created_ip` text NOT NULL,
	`created_by_user` text,
	`expire_at` integer NOT NULL,
	`bytes` integer NOT NULL,
	FOREIGN KEY (`created_by_user`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`created_at` integer NOT NULL,
	`created_ip` text,
	`admin` integer DEFAULT false,
	`invite` text,
	FOREIGN KEY (`invite`) REFERENCES `invites`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `uploads_user_idx` ON `uploads` (`created_by_user`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);
CREATE TABLE `chord_positions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`chord_id` integer NOT NULL,
	`shape_id` integer NOT NULL,
	`string` integer NOT NULL,
	`fret` integer NOT NULL,
	`finger` integer NOT NULL,
	FOREIGN KEY (`chord_id`) REFERENCES `chords`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`shape_id`) REFERENCES `chord_shapes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `chord_shapes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`chord_id` text NOT NULL,
	`tuning` text NOT NULL,
	`base_fret` integer NOT NULL,
	FOREIGN KEY (`chord_id`) REFERENCES `chords`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `chords` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`display_name` text NOT NULL,
	`quality` text NOT NULL,
	`root` text NOT NULL
);

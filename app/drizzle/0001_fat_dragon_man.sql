PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_chord_positions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`chord_id` text NOT NULL,
	`shape_id` integer NOT NULL,
	`string` integer NOT NULL,
	`fret` integer NOT NULL,
	`finger` integer NOT NULL,
	FOREIGN KEY (`chord_id`) REFERENCES `chords`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`shape_id`) REFERENCES `chord_shapes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_chord_positions`("id", "chord_id", "shape_id", "string", "fret", "finger") SELECT "id", "chord_id", "shape_id", "string", "fret", "finger" FROM `chord_positions`;--> statement-breakpoint
DROP TABLE `chord_positions`;--> statement-breakpoint
ALTER TABLE `__new_chord_positions` RENAME TO `chord_positions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
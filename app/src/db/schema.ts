import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import * as Crypto from 'expo-crypto';
export const chords = sqliteTable("chords", {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => Crypto.randomUUID()),
    name: text("name").notNull(),
    display_name: text("display_name").notNull(),
    quality: text("quality").notNull(),
    root: text("root").notNull()
});

export const chord_shapes = sqliteTable("chord_shapes", {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => Crypto.randomUUID()),
    chord_id: text("chord_id").references(() => chords.id, { onDelete: "cascade" }).notNull(),
    tuning: text("tuning").notNull(),
    type: text("type", { enum: ["standard", "barre", "power", "simplified"] })
        .notNull()
        .default("standard"),
    base_fret: integer("base_fret").notNull(),
});

export const chord_positions = sqliteTable("chord_positions", {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => Crypto.randomUUID()),
    chord_id: text("chord_id").references(() => chords.id, { onDelete: "cascade" }).notNull(),
    shape_id: text("shape_id").references(() => chord_shapes.id, { onDelete: "cascade" }).notNull(),
    string: integer("string").notNull(),
    fret: integer("fret").notNull(),
    finger: integer("finger").notNull(),
});
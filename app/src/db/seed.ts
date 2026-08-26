import { db } from './client';
import { chords, chord_shapes, chord_positions } from './schema';
import { count } from 'drizzle-orm';

export async function seedDatabase() {
  const result = await db.select({ value: count() }).from(chords);
  if (result[0].value > 0) {
    // Database is already seeded
    return;
  }

  // 1. C Major Chord
  const [cChord] = await db.insert(chords).values({
    name: 'C',
    display_name: 'C Major',
    quality: 'major',
    root: 'C'
  }).returning();

  const [cShape] = await db.insert(chord_shapes).values({
    chord_id: cChord.id,
    tuning: 'EADGBE',
    base_fret: 1
  }).returning();

  await db.insert(chord_positions).values([
    { chord_id: cChord.id, shape_id: cShape.id, string: 6, fret: -1, finger: 0 },
    { chord_id: cChord.id, shape_id: cShape.id, string: 5, fret: 3, finger: 3 },
    { chord_id: cChord.id, shape_id: cShape.id, string: 4, fret: 2, finger: 2 },
    { chord_id: cChord.id, shape_id: cShape.id, string: 3, fret: 0, finger: 0 },
    { chord_id: cChord.id, shape_id: cShape.id, string: 2, fret: 1, finger: 1 },
    { chord_id: cChord.id, shape_id: cShape.id, string: 1, fret: 0, finger: 0 },
  ]);

  // 2. G Major Chord
  const [gChord] = await db.insert(chords).values({
    name: 'G',
    display_name: 'G Major',
    quality: 'major',
    root: 'G'
  }).returning();

  const [gShape] = await db.insert(chord_shapes).values({
    chord_id: gChord.id,
    tuning: 'EADGBE',
    base_fret: 1
  }).returning();

  await db.insert(chord_positions).values([
    { chord_id: gChord.id, shape_id: gShape.id, string: 6, fret: 3, finger: 2 },
    { chord_id: gChord.id, shape_id: gShape.id, string: 5, fret: 2, finger: 1 },
    { chord_id: gChord.id, shape_id: gShape.id, string: 4, fret: 0, finger: 0 },
    { chord_id: gChord.id, shape_id: gShape.id, string: 3, fret: 0, finger: 0 },
    { chord_id: gChord.id, shape_id: gShape.id, string: 2, fret: 0, finger: 0 },
    { chord_id: gChord.id, shape_id: gShape.id, string: 1, fret: 3, finger: 3 },
  ]);

  // 3. E Minor Chord
  const [emChord] = await db.insert(chords).values({
    name: 'Em',
    display_name: 'E Minor',
    quality: 'minor',
    root: 'E'
  }).returning();

  const [emShape] = await db.insert(chord_shapes).values({
    chord_id: emChord.id,
    tuning: 'EADGBE',
    base_fret: 1
  }).returning();

  await db.insert(chord_positions).values([
    { chord_id: emChord.id, shape_id: emShape.id, string: 6, fret: 0, finger: 0 },
    { chord_id: emChord.id, shape_id: emShape.id, string: 5, fret: 2, finger: 1 },
    { chord_id: emChord.id, shape_id: emShape.id, string: 4, fret: 2, finger: 2 },
    { chord_id: emChord.id, shape_id: emShape.id, string: 3, fret: 0, finger: 0 },
    { chord_id: emChord.id, shape_id: emShape.id, string: 2, fret: 0, finger: 0 },
    { chord_id: emChord.id, shape_id: emShape.id, string: 1, fret: 0, finger: 0 },
  ]);

  // 4. D Major Chord
  const [dChord] = await db.insert(chords).values({
    name: 'D',
    display_name: 'D Major',
    quality: 'major',
    root: 'D'
  }).returning();

  const [dShape] = await db.insert(chord_shapes).values({
    chord_id: dChord.id,
    tuning: 'EADGBE',
    base_fret: 1
  }).returning();

  await db.insert(chord_positions).values([
    { chord_id: dChord.id, shape_id: dShape.id, string: 6, fret: -1, finger: 0 },
    { chord_id: dChord.id, shape_id: dShape.id, string: 5, fret: -1, finger: 0 },
    { chord_id: dChord.id, shape_id: dShape.id, string: 4, fret: 0, finger: 0 },
    { chord_id: dChord.id, shape_id: dShape.id, string: 3, fret: 2, finger: 1 },
    { chord_id: dChord.id, shape_id: dShape.id, string: 2, fret: 3, finger: 3 },
    { chord_id: dChord.id, shape_id: dShape.id, string: 1, fret: 2, finger: 2 },
  ]);

  // 5. A Minor Chord
  const [amChord] = await db.insert(chords).values({
    name: 'Am',
    display_name: 'A Minor',
    quality: 'minor',
    root: 'A'
  }).returning();

  const [amShape] = await db.insert(chord_shapes).values({
    chord_id: amChord.id,
    tuning: 'EADGBE',
    base_fret: 1
  }).returning();

  await db.insert(chord_positions).values([
    { chord_id: amChord.id, shape_id: amShape.id, string: 6, fret: -1, finger: 0 },
    { chord_id: amChord.id, shape_id: amShape.id, string: 5, fret: 0, finger: 0 },
    { chord_id: amChord.id, shape_id: amShape.id, string: 4, fret: 2, finger: 2 },
    { chord_id: amChord.id, shape_id: amShape.id, string: 3, fret: 2, finger: 3 },
    { chord_id: amChord.id, shape_id: amShape.id, string: 2, fret: 1, finger: 1 },
    { chord_id: amChord.id, shape_id: amShape.id, string: 1, fret: 0, finger: 0 },
  ]);
}

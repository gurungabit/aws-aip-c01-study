import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { sql } from 'drizzle-orm'
import * as schema from '../../drizzle/schema'

const client = createClient({
  url: 'file:./exam.db',
})

export const db = drizzle(client, { schema })

// Auto-migrate: add columns if missing
async function migrate() {
  // Ensure tables exist
  await db.run(sql`CREATE TABLE IF NOT EXISTS exams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    version INTEGER NOT NULL DEFAULT 1,
    started_at TEXT NOT NULL,
    finished_at TEXT,
    total_questions INTEGER NOT NULL DEFAULT 75,
    correct_count INTEGER NOT NULL DEFAULT 0,
    scaled_score INTEGER,
    time_spent_seconds INTEGER,
    paused_at TEXT,
    paused_seconds INTEGER NOT NULL DEFAULT 0
  )`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS exam_answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exam_id INTEGER NOT NULL REFERENCES exams(id),
    question_id INTEGER NOT NULL,
    selected_answers TEXT NOT NULL DEFAULT '[]',
    is_correct INTEGER NOT NULL DEFAULT 0,
    submitted INTEGER NOT NULL DEFAULT 0,
    flagged INTEGER NOT NULL DEFAULT 0
  )`)

  // Add columns that may be missing on older databases
  const alterQueries = [
    sql`ALTER TABLE exams ADD COLUMN version INTEGER NOT NULL DEFAULT 1`,
    sql`ALTER TABLE exams ADD COLUMN paused_at TEXT`,
    sql`ALTER TABLE exams ADD COLUMN paused_seconds INTEGER NOT NULL DEFAULT 0`,
  ]
  for (const q of alterQueries) {
    try { await db.run(q) } catch (_) { /* column already exists */ }
  }
}

migrate().catch(console.error)

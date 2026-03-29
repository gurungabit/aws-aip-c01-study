import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { sql } from 'drizzle-orm'
import * as schema from '../../drizzle/schema'

const client = createClient({
  url: 'file:./exam.db',
})

export const db = drizzle(client, { schema })

// Auto-migrate: add version column if missing
async function migrate() {
  try {
    await db.run(sql`ALTER TABLE exams ADD COLUMN version INTEGER NOT NULL DEFAULT 1`)
    console.log('[db] Added version column to exams table')
  } catch (e: any) {
    // Column already exists - that's fine
    if (!e.message?.includes('duplicate column')) {
      // Table might not exist yet, create it
      await db.run(sql`CREATE TABLE IF NOT EXISTS exams (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        version INTEGER NOT NULL DEFAULT 1,
        started_at TEXT NOT NULL,
        finished_at TEXT,
        total_questions INTEGER NOT NULL DEFAULT 75,
        correct_count INTEGER NOT NULL DEFAULT 0,
        scaled_score INTEGER,
        time_spent_seconds INTEGER
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
    }
  }
}

migrate().catch(console.error)

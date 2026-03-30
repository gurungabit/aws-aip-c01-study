import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const exams = sqliteTable('exams', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  version: integer('version').notNull().default(1),
  startedAt: text('started_at').notNull(),
  finishedAt: text('finished_at'),
  totalQuestions: integer('total_questions').notNull().default(75),
  correctCount: integer('correct_count').notNull().default(0),
  scaledScore: integer('scaled_score'),
  timeSpentSeconds: integer('time_spent_seconds'),
  pausedAt: text('paused_at'),
  pausedSeconds: integer('paused_seconds').notNull().default(0),
})

export const examAnswers = sqliteTable('exam_answers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  examId: integer('exam_id')
    .notNull()
    .references(() => exams.id),
  questionId: integer('question_id').notNull(),
  selectedAnswers: text('selected_answers').notNull().default('[]'),
  isCorrect: integer('is_correct', { mode: 'boolean' }).notNull().default(false),
  submitted: integer('submitted', { mode: 'boolean' }).notNull().default(false),
  flagged: integer('flagged', { mode: 'boolean' }).notNull().default(false),
})

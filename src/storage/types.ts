export interface Exam {
  id: number
  version: number
  startedAt: string
  finishedAt: string | null
  totalQuestions: number
  correctCount: number
  scaledScore: number | null
  timeSpentSeconds: number | null
  pausedAt: string | null
  pausedSeconds: number
}

export interface ExamAnswer {
  id: number
  examId: number
  questionId: number
  selectedAnswers: string  // JSON-encoded string[], e.g. '["A","B"]'
  isCorrect: boolean
  submitted: boolean
  flagged: boolean
}

export interface AipDB {
  exams: {
    key: number
    value: Exam
    indexes: { 'by-finishedAt': string }
  }
  examAnswers: {
    key: number
    value: ExamAnswer
    indexes: { 'by-examId': number }
  }
}

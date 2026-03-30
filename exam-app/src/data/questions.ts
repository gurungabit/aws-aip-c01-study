export interface Question {
  id: number
  domain: 'D1' | 'D2' | 'D3' | 'D4' | 'D5'
  domainName: string
  multi: boolean
  text: string
  options: { letter: string; text: string }[]
  correct: string[]
  explanation: string
}

import { questionsV1 } from './questions-v1'
import { questionsV2 } from './questions-v2'
import { questionsV3 } from './questions-v3'
import { questionsV4 } from './questions-v4'
import { questionsV5 } from './questions-v5'
import { questionsV6 } from './questions-v6'

export const VERSIONS = [1, 2, 3, 4, 5, 6] as const
export type ExamVersion = (typeof VERSIONS)[number]

const questionBanks: Record<ExamVersion, Question[]> = {
  1: questionsV1,
  2: questionsV2,
  3: questionsV3,
  4: questionsV4,
  5: questionsV5,
  6: questionsV6,
}

export function getQuestions(version: ExamVersion = 1): Question[] {
  return questionBanks[version] ?? questionsV1
}

// Default export for backward compat
export const questions = questionsV1

import { openDB } from 'idb'
import type { DBSchema, IDBPDatabase } from 'idb'
import type { AipDB } from './types'

let _db: IDBPDatabase<AipDB> | null = null

export async function getDB(): Promise<IDBPDatabase<AipDB>> {
  if (_db) return _db
  _db = await openDB<AipDB>('aip-c01', 1, {
    upgrade(db) {
      // exams store
      const examStore = db.createObjectStore('exams', {
        keyPath: 'id',
        autoIncrement: true,
      })
      examStore.createIndex('by-finishedAt', 'finishedAt')

      // examAnswers store
      const answerStore = db.createObjectStore('examAnswers', {
        keyPath: 'id',
        autoIncrement: true,
      })
      answerStore.createIndex('by-examId', 'examId')
    },
  })
  return _db
}

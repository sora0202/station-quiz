import Station from './Station'
import Line from './Line'

export interface Answer {
  question: Station
  answer: Line
}

export interface AnswerListElement {
  answer: Answer
  isCorrect: Boolean
}

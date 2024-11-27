export interface Questions {
  questions: Question[]
}

// >>> DATABASE STRUCTURE <<<
export interface Question {
  id: number
  question: string
  correctanswer: string
  incorrectanswer1: string
  incorrectanswer2: string
  incorrectanswer3: string
}

export interface NewQuestion {
  question: string
  correctanswer: string
  incorrectanswers: string[]
}

export interface UpdateQuestionData {
  question?: string
  correctanswer?: string
  incorrectanswers?: string[]
}

// >>> PROPS <<<
export interface PropsReset {
  totalQuestions: number
  correctQuestions: number
  onPress: () => void
}

export interface PropsStatBar {
  currentQuestion: number
  totalQuestions: number
  correct: number
  incorrect: number
}

export interface PropsQuestion {
  question: Question
  onSubmit: (correct: boolean) => void
}

export interface PropsAnswer {
  onPress: () => void
  text: string
  color?: string
  disabled?: boolean
}

export interface PropsAnswers {
  choices?: string[]
  question: Question
  onSubmit: (correct: boolean) => void
}

export interface AddQuestionModalProps {
  onClose: () => void
  onAdd: () => void
}

export interface DeleteQuestionModalProps {
  questions: Question[]
  onClose: () => void
  onDelete: (id: number) => void
}

export interface UpdateQuestionModalProps {
  questionData: Question
  onClose: () => void
  onUpdate: () => void
}

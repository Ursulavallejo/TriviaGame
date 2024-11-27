import Answers from './Answers'
import { Question, PropsQuestion } from '../interfaces'

// >> GENERICS for PropsQuestions <<
const QuestionComponent = <T extends PropsQuestion>({
  question,
  onSubmit,
}: T) => {
  const { correctanswer }: Question = question

  return (
    <div>
      <h3>{question.question}</h3>
      <Answers
        correctAnswer={correctanswer}
        question={question}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default QuestionComponent

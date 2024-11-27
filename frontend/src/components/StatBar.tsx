import { PropsStatBar } from '../interfaces'

function StatBar(props: PropsStatBar) {
  return (
    <div className="stat-container">
      <p>
        Question: {props.currentQuestion}/ {props.totalQuestions}
      </p>
      <p>Correct: {props.correct}</p>
      <p>Incorrect: {props.incorrect}</p>
    </div>
  )
}

export default StatBar

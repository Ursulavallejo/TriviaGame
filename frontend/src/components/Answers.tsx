import { useState, useEffect } from 'react'
import Answer from './Answer'
import { PropsAnswers, Question } from '../interfaces'

// GENERICS TO USE PROPS
const Answers = <T extends PropsAnswers>({ question, onSubmit }: T) => {
  const {
    correctanswer,
    incorrectanswer1,
    incorrectanswer2,
    incorrectanswer3,
  }: Question = question

  const [shuffledChoices, setShuffledChoices] = useState<string[]>([])
  const [showAnswer, setShowAnswer] = useState<boolean>(false)

  // Shuffle the choices each time the question changes
  useEffect(() => {
    const choices = [
      correctanswer,
      incorrectanswer1,
      incorrectanswer2,
      incorrectanswer3,
    ]

    const shuffleArray = (array: string[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
      }
      return array
    }

    setShuffledChoices(shuffleArray([...choices]))
    setShowAnswer(false)
  }, [correctanswer, incorrectanswer1, incorrectanswer2, incorrectanswer3])

  const onPress = (choice: string) => {
    setShowAnswer(true)
    onSubmit(choice === correctanswer)
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '4em',
      }}
    >
      {shuffledChoices.map((choice, index) => {
        let color = ''

        if (showAnswer) {
          color = choice === correctanswer ? '#84fc03' : 'red'
        }

        return (
          <Answer
            key={index}
            text={choice}
            onPress={() => onPress(choice)}
            color={color}
            disabled={showAnswer}
          />
        )
      })}
    </div>
  )
}

export default Answers

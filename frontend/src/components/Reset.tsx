import { useState, useEffect } from 'react'
import { PropsReset } from '../interfaces'
import Confetti from 'react-confetti'

function Reset(props: PropsReset) {
  const scorePercentage = Math.round(
    (props.correctQuestions / props.totalQuestions) * 100
  )
  const passed = scorePercentage > 50
  const [showFailMessage, setShowFailMessage] = useState(!passed)

  useEffect(() => {
    if (!passed) {
      const timer = setTimeout(() => {
        setShowFailMessage(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [passed])

  return (
    <>
      {showFailMessage && !passed && (
        <div className="fail-message" id="style-fail">
          Oops! You can do better next time! 😢
        </div>
      )}

      <div className="stat-container">
        {scorePercentage > 50 && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={200}
          />
        )}
        <h1>
          You Scored: {scorePercentage}%
          {/* {Math.round((props.correctQuestions / props.totalQuestions) * 100)}% */}
        </h1>

        <button onClick={props.onPress}>Press to try again!!</button>
      </div>
    </>
  )
}

export default Reset

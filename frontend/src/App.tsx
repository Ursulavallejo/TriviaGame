import { useEffect, useState } from 'react'
import { Button, Modal, ListGroup } from 'react-bootstrap'
import AddQuestionModal from './components/AddQuestionModal'
import QuestionComponent from './components/Question'
import Reset from './components/Reset'
import StatBar from './components/StatBar'
import UpdateQuestionModal from './components/UpdateQuestionModal'
import { Question } from './interfaces'

import triviaImage from './assets/trivia.webp'

function App() {
  const [data, setData] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [correctAnswers, setCorrectAnswers] = useState<number>(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0)
  const [waitingToAdvance, setWaitingToAdvance] = useState<boolean>(false)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  )

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [isQuestionsModalOpen, setIsQuestionsModalOpen] =
    useState<boolean>(false)

  const fetchData = async () => {
    try {
      const response = await fetch('/api')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: Question[] = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/questions/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setData((prevData) => prevData.filter((question) => question.id !== id))
      }
    } catch (error) {
      console.error('Error deleting question:', error)
    }
  }

  const handleUpdateClick = (question: Question) => {
    setSelectedQuestion(question)
  }

  const handleUpdateClose = () => {
    setSelectedQuestion(null)
  }

  const reset = () => {
    setCurrentQuestionIndex(0)
    setCorrectAnswers(0)
    setIncorrectAnswers(0)
    setWaitingToAdvance(false)
  }

  const advance = () => {
    setWaitingToAdvance(false)
    setCurrentQuestionIndex((prev) => prev + 1)
  }

  const onSubmit = (correct: boolean) => {
    if (correct) {
      setCorrectAnswers((prev) => prev + 1)
    } else {
      setIncorrectAnswers((prev) => prev + 1)
    }
    setWaitingToAdvance(true)
  }

  // If all questions are answered, show reset screen
  if (currentQuestionIndex >= data.length) {
    return (
      <Reset
        totalQuestions={data.length}
        correctQuestions={correctAnswers}
        onPress={reset}
      />
    )
  }

  return (
    <div className="app-container">
      {/* Action Buttons */}
      <div className="action-buttons">
        <Button
          id="btn-see-questions"
          variant="primary"
          onClick={() => setIsQuestionsModalOpen(true)}
        >
          See Questions
        </Button>
        <Button
          id="btn-add-questions"
          variant="success"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add New Question
        </Button>
      </div>

      {/* Trivia Image */}
      <div
        className="image-container"
        style={{ textAlign: 'center', margin: '20px 0', width: '300px' }}
      >
        <img
          src={triviaImage}
          alt="Trivia"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>

      {/* Main Content */}
      <div
        className={`main-content ${
          isQuestionsModalOpen || isAddModalOpen || selectedQuestion
            ? 'blur-background'
            : ''
        }`}
      >
        <h1>Welcome to Trivia</h1>
        <StatBar
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={data.length}
          correct={correctAnswers}
          incorrect={incorrectAnswers}
        />
        {data[currentQuestionIndex] && (
          <QuestionComponent
            question={data[currentQuestionIndex]}
            onSubmit={onSubmit}
          />
        )}
        {waitingToAdvance && (
          <Button
            className="mt-3"
            onClick={advance}
            style={{
              marginTop: '1.5rem',
            }}
          >
            NEXT Question ...
          </Button>
        )}
      </div>

      {/* Modals */}
      <Modal
        show={isQuestionsModalOpen}
        onHide={() => setIsQuestionsModalOpen(false)}
        size="lg"
        centered
        backdrop="static"
        className="modal-dialog"
      >
        <Modal.Header>
          <Modal.Title>All Questions</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          <ListGroup>
            {data.map((question) => (
              <ListGroup.Item
                key={question.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>{question.question}</div>
                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    id="btn-update"
                    variant="warning"
                    onClick={() => handleUpdateClick(question)}
                  >
                    ✎
                  </Button>
                  <Button
                    id="btn-delete"
                    variant="danger"
                    onClick={() => handleDelete(question.id)}
                  >
                    🗑
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsQuestionsModalOpen(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {isAddModalOpen && (
        <AddQuestionModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={fetchData}
        />
      )}

      {selectedQuestion && (
        <UpdateQuestionModal
          questionData={selectedQuestion}
          onClose={handleUpdateClose}
          onUpdate={fetchData}
        />
      )}
    </div>
  )
}

export default App

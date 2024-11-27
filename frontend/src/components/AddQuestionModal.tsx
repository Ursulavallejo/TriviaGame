import { useState } from 'react'
import { AddQuestionModalProps, NewQuestion } from '../interfaces'
import { Modal, Button, Form } from 'react-bootstrap'

const AddQuestionModal = <T extends AddQuestionModalProps>({
  onClose,
  onAdd,
}: T) => {
  const [question, setQuestion] = useState<string>('')
  const [correctanswer, setCorrectAnswer] = useState<string>('')
  const [incorrectanswers, setIncorrectAnswers] = useState<string[]>([
    '',
    '',
    '',
  ])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleAddQuestion = async () => {
    const newQuestion: NewQuestion = {
      question,
      correctanswer,
      incorrectanswers,
    }

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      })

      if (response.ok) {
        onAdd()
        onClose()
      } else {
        console.error('Error adding question:', response.statusText)
        setErrorMessage('Failed to add: Question already exist!')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header>
        <Modal.Title id="modal-add-title">Add New Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Question:</Form.Label>
            <Form.Control
              id="input-add-question"
              type="text"
              placeholder="Enter the question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={{ backgroundColor: '#f0f8ff', color: '#000' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Correct Answer:</Form.Label>
            <Form.Control
              id="input-add-correct"
              type="text"
              placeholder="Enter the correct answer"
              value={correctanswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              style={{ backgroundColor: '#f0f8ff', color: '#000' }}
            />
          </Form.Group>
          <Form.Label>Incorrect Answers:</Form.Label>
          {incorrectanswers.map((ans, index) => (
            <Form.Group key={index} className="mb-3">
              <Form.Control
                id={`input-add-incorrect-${index}`}
                className="input-add-incorrect"
                type="text"
                placeholder={`Incorrect Answer ${index + 1}`}
                value={ans}
                onChange={(e) => {
                  const newAnswers = [...incorrectanswers]
                  newAnswers[index] = e.target.value
                  setIncorrectAnswers(newAnswers)
                }}
                style={{ backgroundColor: '#f0f8ff', color: '#000' }}
              />
            </Form.Group>
          ))}
        </Form>
        {errorMessage && (
          <div
            className="alert alert-danger"
            role="alert"
            style={{ color: '#f80808' }}
          >
            {errorMessage}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer style={{ marginTop: '20px' }}>
        <Button
          id="btn-add"
          variant="primary"
          className="mt-3"
          onClick={handleAddQuestion}
        >
          Add Question
        </Button>
        <Button variant="secondary" className="mt-3" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddQuestionModal

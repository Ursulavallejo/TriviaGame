import { useState } from 'react'
import { UpdateQuestionModalProps, UpdateQuestionData } from '../interfaces'
import { Modal, Button, Form } from 'react-bootstrap'

// GENERIC to handle props
const UpdateQuestionModal = <T extends UpdateQuestionModalProps>({
  questionData,
  onClose,
  onUpdate,
}: T) => {
  const [question, setQuestion] = useState<string>(questionData.question)
  const [correctanswer, setCorrectAnswer] = useState<string>(
    questionData.correctanswer
  )
  const [incorrectanswers, setIncorrectAnswers] = useState<string[]>([
    questionData.incorrectanswer1,
    questionData.incorrectanswer2,
    questionData.incorrectanswer3,
  ])

  const handleUpdateQuestion = async () => {
    const updatedData: UpdateQuestionData = {
      question,
      correctanswer,
      incorrectanswers,
    }

    try {
      const response = await fetch(`/api/questions/${questionData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })

      if (response.ok) {
        onUpdate()
        onClose()
      } else {
        console.error('Error updating question:', response.statusText)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header>
        <Modal.Title id="modal-update">Update Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Question</Form.Label>
            <Form.Control
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={{ backgroundColor: '#f0f8ff', color: '#000' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Correct Answer</Form.Label>
            <Form.Control
              type="text"
              value={correctanswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              style={{ backgroundColor: '#f0f8ff', color: '#000' }}
            />
          </Form.Group>
          <Form.Label>Incorrect Answers</Form.Label>
          {incorrectanswers.map((ans, index) => (
            <Form.Group className="mb-2" key={index}>
              <Form.Control
                type="text"
                value={ans}
                onChange={(e) => {
                  const updatedAnswers = [...incorrectanswers]
                  updatedAnswers[index] = e.target.value
                  setIncorrectAnswers(updatedAnswers)
                }}
                style={{ backgroundColor: '#f0f8ff', color: '#000' }}
              />
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ marginTop: '20px' }}>
        <Button variant="primary" onClick={handleUpdateQuestion}>
          Save Changes
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateQuestionModal

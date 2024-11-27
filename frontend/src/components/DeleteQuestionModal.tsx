import { useState } from 'react'
import { DeleteQuestionModalProps } from '../interfaces'

// >> GENERIC PROPS
const DeleteQuestionModal = <T extends DeleteQuestionModalProps>({
  questions,
  onClose,
  onDelete,
}: T) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  )

  const handleDelete = async () => {
    if (!selectedQuestionId) return

    try {
      const response = await fetch(`/api/questions/${selectedQuestionId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        onDelete(selectedQuestionId)
        onClose()
      } else {
        console.error('Error deleting question:', response.statusText)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="modal">
      <h2>Delete Question</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            {question.question}
            <button onClick={() => setSelectedQuestionId(question.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {selectedQuestionId && (
        <div>
          <p>Are you sure you want to delete this question?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setSelectedQuestionId(null)}>No</button>
        </div>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  )
}

export default DeleteQuestionModal

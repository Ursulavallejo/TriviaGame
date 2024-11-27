import QuestionComponent from '../../src/components/Question'
import data from '../../cypress/fixtures/data.json'

describe('<QuestionComponent />', () => {
  it('renders the first question and its correct answer', () => {
    const mockQuestion = data[0]
    const mockOnSubmit = cy.stub() // works as the call of a fucntion onSubmit

    cy.mount(
      <QuestionComponent question={mockQuestion} onSubmit={mockOnSubmit} />
    )

    cy.get('h3').should('contain', mockQuestion.question)

    cy.contains(mockQuestion.correctanswer).should('exist')
  })
})

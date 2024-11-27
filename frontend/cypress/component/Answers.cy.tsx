import Answers from '../../src/components/Answers'
import data from '../../cypress/fixtures/data.json'

describe('<Answers />', () => {
  it('renders all four answers', () => {
    const mockQuestion = data[0]
    const mockOnSubmit = cy.stub()

    cy.mount(<Answers question={mockQuestion} onSubmit={mockOnSubmit} />)

    cy.get('button').should('have.length', 4)
    cy.get('button').each((btn) => {
      expect(btn.text()).to.be.oneOf([
        mockQuestion.correctanswer,
        mockQuestion.incorrectanswer1,
        mockQuestion.incorrectanswer2,
        mockQuestion.incorrectanswer3,
      ])
    })
  })

  it('marks the correct answer in green and incorrect in red', () => {
    const mockQuestion = data[0]
    const mockOnSubmit = cy.stub()

    cy.mount(<Answers question={mockQuestion} onSubmit={mockOnSubmit} />)

    cy.get('button').contains(mockQuestion.incorrectanswer1).click()

    cy.get('button')
      .contains(mockQuestion.correctanswer)
      .should('have.css', 'color', 'rgb(132, 252, 3)')
    cy.get('button')
      .contains(mockQuestion.incorrectanswer1)
      .should('have.css', 'color', 'rgb(255, 0, 0)')
  })
  //  Same as above but different aproach DINAMIC
  it('checks all answers dynamically', () => {
    const mockQuestion = data[0]
    const mockOnSubmit = cy.stub()

    cy.mount(<Answers question={mockQuestion} onSubmit={mockOnSubmit} />)

    cy.get('button').contains(mockQuestion.incorrectanswer2).click()
    ;[
      mockQuestion.correctanswer,
      mockQuestion.incorrectanswer1,
      mockQuestion.incorrectanswer2,
      mockQuestion.incorrectanswer3,
    ].forEach((answer) => {
      cy.get('button')
        .contains(answer)
        .then(($btn) => {
          //$btn is the DOM element that Cypress has captured.
          const expectedColor =
            answer === mockQuestion.correctanswer
              ? 'rgb(132, 252, 3)'
              : 'rgb(255, 0, 0)'

          cy.wrap($btn).should('have.css', 'color', expectedColor)
        })
    })
  })

  it('disables all buttons after an answer is clicked', () => {
    const mockQuestion = data[0]
    const mockOnSubmit = cy.stub()

    cy.mount(<Answers question={mockQuestion} onSubmit={mockOnSubmit} />)

    cy.get('button').first().click()

    cy.get('button').should('be.disabled')
  })
})

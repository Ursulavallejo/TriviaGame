describe('Complete E2E Test without mock', () => {
  it('Creates a new question and verifies it is saved in the database', () => {
    const newQuestion = {
      question: 'What is the capital of Italy?',
      correctanswer: 'Rome',
      incorrectanswers: ['Paris', 'Berlin', 'Madrid'],
    }

    // Add a new question to the database
    cy.visit('http://localhost:5173/')
    cy.get('#btn-add-questions').click()
    cy.get('.modal-dialog').should('be.visible')
    cy.get('#modal-add-title').contains('Add New Question')
    cy.get('#input-add-question').type(newQuestion.question)
    cy.get('#input-add-correct').type(newQuestion.correctanswer)
    cy.get('.input-add-incorrect').each(($input, index) => {
      cy.wrap($input).type(newQuestion.incorrectanswers[index])
    })

    // Why with ID do not work?
    // cy.get('#input-add-incorrect-0').eq(0).type(newQuestion.incorrectanswers[0])
    // cy.get('#input-add-incorrect-1').eq(1).type(newQuestion.incorrectanswers[1])
    // cy.get('#input-add-incorrect-2').eq(2).type(newQuestion.incorrectanswers[2])
    cy.get('#btn-add').click()

    // Backend & Database: Verify the new question exists
    cy.request('GET', 'http://localhost:3000/api').then((response) => {
      expect(response.status).to.eq(200)
      const addedQuestion = response.body.find(
        (q: any) => q.question === newQuestion.question
      )
      expect(addedQuestion).to.exist
      expect(addedQuestion.correctanswer).to.eq(newQuestion.correctanswer)
    })

    // Frontend: Verify the question appears in the list
    cy.visit('http://localhost:5173/')
    cy.get('button').contains('See Questions').click()
    cy.get('.list-group').should('contain', newQuestion.question)
  })
})

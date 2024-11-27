describe('Show errors when adding incorrect data', () => {
  it('Shows an error message when the backend fails', () => {
    cy.intercept('POST', '/api/questions', { statusCode: 500 }).as(
      'postQuestion'
    )

    cy.visit('http://localhost:5173/')
    cy.get('#btn-add-questions').click()
    cy.get('#input-add-question').type('Invalid question')
    cy.get('#btn-add').click()

    cy.wait('@postQuestion')
    cy.get('.alert-danger').should(
      'contain',
      'Failed to add: Question already exist!'
    )
  })
})

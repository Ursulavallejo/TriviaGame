describe('GET API Data Loading correct  ', function () {
  it('Loads data from the API and displays it', function () {
    cy.fixture('data.json').then((mockData) => {
      cy.intercept('GET', '/api', {
        statusCode: 200,
        body: mockData,
      }).as('getQuestions')
    })
    cy.visit('http://localhost:5173/')
    cy.get('#btn-see-questions').click()
    cy.wait('@getQuestions')
    cy.get('.modal-title').contains('All Questions')
    cy.get('.list-group').should('have.length.greaterThan', 0)

    cy.get('.list-group').should(
      'contain',
      "Who is the main character in the Disney movie 'The Lion King'?"
    )
    cy.get('#btn-delete').contains('🗑')
    cy.get('#btn-update').contains('✎')

    cy.get('#btn-update').click()
    cy.get('.modal-dialog').should('be.visible')
    cy.get('#modal-update').contains('Update Question')

    cy.get('form input').should('have.length', 5)
    cy.get('form label').eq(0).should('contain', 'Question')
    cy.get('form label').eq(1).should('contain', 'Correct Answer')
    cy.get('form label').eq(2).should('contain', 'Incorrect Answers')
  })
})

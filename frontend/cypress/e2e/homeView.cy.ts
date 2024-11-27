describe('my home view shows correct ', function () {
  it('visits my site, Basic E2E Test', function () {
    cy.visit('http://localhost:5173/')
    cy.get('h1').should('contain', 'Welcome to Trivia')
  })

  it('Visit my site and check button contain text', function () {
    cy.visit('http://localhost:5173/')
    cy.get('#btn-see-questions').contains('See Questions')
    cy.get('#btn-see-questions').click()
    cy.get('.modal-title').contains('All Questions')
  })
})

describe('Integration test - GET', () => {
  it('Fetches all questions from the backend', () => {
    cy.request('GET', 'http://localhost:3000/api').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
      expect(response.body[0]).to.have.property('question')
    })
  })
})

// If you want to run again this test the Question need to be deleted from the database otherwise do not past the test as the quetion alreday exist on the data base.
describe('Integration test - POST', () => {
  it('Adds a new question to the backend', () => {
    const newQuestion = {
      question: "What is the name of the cowboy in 'Toy Story'?",
      correctanswer: 'Woody',
      incorrectanswers: ['Buzz Lightyear', 'Jessie', 'Bo Peep'],
    }

    cy.request('POST', 'http://localhost:3000/api/questions', newQuestion).then(
      (response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('id')
        expect(response.body.question).to.eq(newQuestion.question)
      }
    )
  })
})

describe('CRUD Operations Integration Test', () => {
  let questionId: number // ID for testing

  // POST- create a new questions
  it('Creates a new question (POST)', () => {
    const newQuestion = {
      question: 'Who was the first person to walk on the Moon?',
      correctanswer: 'Neil Armstrong',
      incorrectanswers: ['Neil Armstrong', 'Yuri Gagarin', 'Michael Collins'],
    }

    cy.request('POST', 'http://localhost:3000/api/questions', newQuestion).then(
      (response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('id')
        questionId = response.body.id // ID for testing is saved
        expect(response.body.question).to.eq(newQuestion.question)
      }
    )
  })

  // GET- check if the new qustion was created
  it('Give back the created question (GET)', () => {
    cy.request('GET', 'http://localhost:3000/api').then((response) => {
      expect(response.status).to.eq(200)
      const createdQuestion = response.body.find(
        (q: any) => q.id === questionId
      )
      expect(createdQuestion).to.exist
      expect(createdQuestion.question).to.eq(
        'Who was the first person to walk on the Moon?'
      )
    })
  })

  // PATCH- Update question
  it('Updates the question (PATCH)', () => {
    const updatedData = {
      question: 'Who was the first person to walk on the Moon?',
      correctanswer: 'Neil Armstrong',
      incorrectanswer1: 'Buzz Aldrin',
      incorrectanswer2: 'Yuri Gagarin',
      incorrectanswer3: 'Michael Collins',
    }

    cy.request(
      'PATCH',
      `http://localhost:3000/api/questions/${questionId}`,
      updatedData
    ).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.updatedQuestion).to.have.property('id', questionId)
      expect(response.body.updatedQuestion.question).to.eq(updatedData.question)
    })
  })

  // GET -Check if update worked
  it('Goves back the updated question (GET)', () => {
    cy.request('GET', 'http://localhost:3000/api').then((response) => {
      expect(response.status).to.eq(200)
      const updatedQuestion = response.body.find(
        (q: any) => q.id === questionId // ID for testing we saved before
      )
      expect(updatedQuestion).to.exist
      expect(updatedQuestion.question).to.eq(
        'Who was the first person to walk on the Moon?'
      )
    })
  })

  // DELETE - the question
  it('Deletes the question (DELETE)', () => {
    cy.request(
      'DELETE',
      `http://localhost:3000/api/questions/${questionId}`
    ).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('Question deleted successfully')
    })
  })

  // GET - to check if Question was deleted
  it('Verifies the question has been deleted (GET)', () => {
    cy.request('GET', 'http://localhost:3000/api').then((response) => {
      expect(response.status).to.eq(200)
      const deletedQuestion = response.body.find(
        (q: any) => q.id === questionId
      )
      expect(deletedQuestion).to.not.exist
    })
  })
})

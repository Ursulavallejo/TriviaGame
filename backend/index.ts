import cors from 'cors'
import * as dotenv from 'dotenv'
import { Client } from 'pg'
import express, { Request, Response } from 'express'

// import path from 'path'

dotenv.config()

const client = new Client({
  connectionString: process.env.PGURI,
})

client.connect()

const app = express()
app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  })
)

interface Question {
  id: number
  question: string
  correctanswer: string
  incorrectanswer1: string
  incorrectanswer2: string
  incorrectanswer3: string
}

// >>>  GET QUESTION  <<<

app.get('/api', async (req: Request, res: Response) => {
  try {
    const { rows }: { rows: Question[] } = await client.query(
      'SELECT * FROM questions'
    )
    res.send(rows)
  } catch (error) {
    console.error('Error fetching questions:', error)
    res.status(500).send('Internal Server Error')
  }
})

// >>>  POST QUESTION  <<<

app.post('/api/questions', async (req: Request, res: Response) => {
  const {
    question,
    correctanswer,
    incorrectanswers,
  }: { question: string; correctanswer: string; incorrectanswers: string[] } =
    req.body

  try {
    const query = `
      INSERT INTO questions (question, correctAnswer, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `
    const values = [question, correctanswer, ...incorrectanswers]

    const { rows }: { rows: Question[] } = await client.query(query, values)
    res.status(201).send(rows[0])
  } catch (error) {
    console.error('Error inserting question:', error)
    res.status(500).send('Internal Server Error')
  }
})
// >>>  DELETE QUESTION  <<<

app.delete(
  '/api/questions/:id',
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params

    try {
      const query = `DELETE FROM questions WHERE id = $1 RETURNING *`
      const { rows }: { rows: Question[] } = await client.query(query, [id])

      if (rows.length === 0) {
        res.status(404).json({ message: 'Question not found' })
        return
      }

      res.status(200).json({
        message: 'Question deleted successfully',
        deletedQuestion: rows[0],
      })
    } catch (error) {
      console.error('Error deleting question:', error)
      res.status(500).send('Internal Server Error')
    }
  }
)

// >>>  UPDATE QUESTION  <<<

app.patch('/api/questions/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const {
    question,
    correctanswer,
    incorrectanswer1,
    incorrectanswer2,
    incorrectanswer3,
  }: Question = req.body

  const updates: string[] = []
  const values: (string | number)[] = []

  if (question)
    updates.push('question = $' + (values.length + 1)), values.push(question)
  if (correctanswer)
    updates.push('correctAnswer = $' + (values.length + 1)),
      values.push(correctanswer)
  if (incorrectanswer1)
    updates.push('incorrectAnswer1 = $' + (values.length + 1)),
      values.push(incorrectanswer1)
  if (incorrectanswer2)
    updates.push('incorrectAnswer2 = $' + (values.length + 1)),
      values.push(incorrectanswer2)
  if (incorrectanswer3)
    updates.push('incorrectAnswer3 = $' + (values.length + 1)),
      values.push(incorrectanswer3)

  if (updates.length === 0) {
    res.status(400).json({ message: 'No fields to update' })
    return
  }

  values.push(id)

  try {
    const query = `
      UPDATE questions
      SET ${updates.join(', ')}
      WHERE id = $${values.length}
      RETURNING *
    `
    const { rows }: { rows: Question[] } = await client.query(query, values)

    if (rows.length === 0) {
      res.status(404).json({ message: 'Question not found' })
      return
    }

    res.status(200).json({
      message: 'Question updated successfully',
      updatedQuestion: rows[0],
    })
  } catch (error) {
    console.error('Error updating question:', error)
    res.status(500).send('Internal Server Error')
  }
})

// // app.use(express.static(path.join(path.resolve(), 'dist'))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}`)
})

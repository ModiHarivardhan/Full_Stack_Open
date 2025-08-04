const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const Person = require('./models/person')

const app = express()


app.use(cors())
app.use(express.json())


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB connection error:', error.message))


app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => {
      const formatted = persons.map((person, index) => {
        const plain = person.toJSON()
        return {
          ...plain,
          id: index + 1
        }
      })
      res.json(formatted)
    })
    .catch(error => next(error))
})


app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).json({ error: 'Person not found' })
      }
    })
    .catch(error => next(error))
})


app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body
  const person = new Person({ name, number })

  person.save()
    .then(savedPerson => res.json(savedPerson.toJSON()))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  )
    .then(updatedPerson => response.json(updatedPerson))
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error))
})


app.use(express.static('dist'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})


app.use((req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
})


app.use((error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  res.status(500).json({ error: 'internal server error' })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})

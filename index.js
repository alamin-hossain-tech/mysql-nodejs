const express = require('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1231997Ab',
  database: 'test'
})

app.use(express.json())

app.get('/', (req, res) => {
  res.json('Server Running')
})

app.get('/books', (req, res) => {
  const q = 'SELECT * FROM books'
  db.query(q, (err, data) => {
    if (err) return res.json('something went wrong')
    return res.json(data)
  })
})
app.post('/books', (req, res) => {
  const q = 'INSERT INTO books(`title`, `description`, `cover`) VALUES (?)'
  const values = [req.body.title, req.body.description, req.body.cover]
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json('Books Added Successfully')
  })
})

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id
  const q = ' DELETE FROM books WHERE id = ? '

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err)
    return res.json(data)
  })
})

app.put('/books/:id', (req, res) => {
  const bookId = req.params.id
  const q =
    'UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?'

  const values = [req.body.title, req.body.desc, req.body.price, req.body.cover]

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err)
    return res.json(data)
  })
})

app.listen(5000, () => {
  console.log('server running')
})

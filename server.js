const express = require('express')
const app = express()
const path = require('path');
const port = 3001


const notes = require('./db/db.json');

app.use(express.static('public'));


app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname), '/public/index.html'))
    

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)
app.get('/api/notes', (req, res) => res.json(notes))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

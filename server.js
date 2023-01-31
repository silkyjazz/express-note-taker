const express = require('express')
const app = express()
const path = require('path');
const port = 3000
const fs = require('fs');
const uuid = require('./helpers/uuid');
const { readAndAppend, writeToFile, readFromFile } = require('./helpers/fsUtils');

const notes = require('./db/db.json');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data)=> res.json(JSON.parse(data)))
})

app.post('/api/notes', (req, res) =>{ 
    console.log(req.body)
    // console.log(req)
    const {title, text} = req.body

    console.log(req.body)
    let notesArr = []
    if(title && text){
        const newNote = {
            title,
            text,
            id: uuid()
        }

        readAndAppend(newNote, './db/db.json');
        // fs.readFile('./db/db.json', 'utf-8', (err, data) =>{
        //     if (err){
        //         console.log(err)
        //     }else{
        //         //converting string into object
        //         notesArr = JSON.parse(data)
        //         //adding new note
        //         notesArr.push(newNote)
        //         fs.writeFile('./db/db.json', JSON.stringify(notesArr, null, 4),
        //         (writeErr) => writeErr ? console.error(writeErr) : console.info('Succeessfully added new note')
        //         )

        //     }
        // })

        const response = {
            status: 'success',
            body: newNote,
        };
        console.log(response)
        res.status(201).json(response)
    }else{
        res.status(500).json('Error adding new note')
    }

})

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname), '/public/index.html'))
    

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

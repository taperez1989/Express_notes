const express = require('express');
const path = require('path');
const fs = require('fs');
// const api = require('./Develop/public/assets/js/index.js');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 3001

const userId = uuidv4();
console.log(userId);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/notes', (req, res) => {
    console.log('get request for notes')
    const savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json')))
    console.log(savedNotes);
    res.json(savedNotes)
})

app.post('/api/notes', (req, res) => {
    console.log('post request for notes')
    const savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json'),'utf-8'))
    req.body.id = uuidv4();
    savedNotes.push(req.body);
    const newNote = fs.writeFileSync('./db/db.json', JSON.stringify(savedNotes));
    res.json(newNote);
})

app.delete('/api/notes/:id', (req, res) => {
    const savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf-8'))
    const noteId = req.params.id;
    const deletedNote = savedNotes.filter(note => note.id !== noteId)
    const updatedNote = fs.writeFileSync('./db/db.json', JSON.stringify(deletedNote));
    console.log(userId);
    res.json(updatedNote);
})


app.use(express.static('public'));



// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);


app.listen(PORT, () =>
    console.log(`app listening at http://localhost:${PORT}`));

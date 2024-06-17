const express = require('express');
const path = require('path');
const fs = require('fs');
// const api = require('./Develop/public/assets/js/index.js');
const { v4 : uuidv4 } = require ('uuid');
const app = express();
const PORT = process.env.PORT || 3001

const userId = uuidv4();
console.log(userId);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/notes', (req, res) => {
    const savedNotes =JSON.parse( fs.readFileSync(path.join(__dirname, './db/db.json')))
    console.log(savedNotes);
    res.json(savedNotes)
})
    
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            userId: uuidv4(),
        };

//         fs.readFile('./db/db.json', 'utf8', (readErr, data) => {
//             if (readErr) {
//                 console.error(readErr);
//                 res.status(500).send('Error reading notes file.');
//             } else {
//                 let notes = JSON.parse(data);
//                 notes.push(newSavedNote);
//                 fs.writeFile('./db/db.json', JSON.stringify(notes, null, 4), (writeErr) => {
//                     if (writeErr) {
//                         console.error(writeErr);
//                         res.status(500).send('Error saving note.');
//                     } else {
//                         console.info('Successfully updated saved notes');
//                         res.json(newSavedNote);
//                     }
//                 });
//             }
//         });
//     } else {
//         res.status(400).send('Title and text are required for a note.');
//     }
// })

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting review');
    }
});

app.delete('/api/notes/:id', (req, res) => {
    const userId = req.params.id;

    console.log(userId);
    res.send(`delete  request recieved for ID ${userId}`);
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

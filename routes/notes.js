const note = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
note.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
)
// .then((data) => {

// });

// POST Route for submitting note
note.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting note');
    }
});

note.delete('/:id', (req,res) => {
    const idToDelete = req.params.id;
    readFromFile('./db/db.json').then
    ((data) => {
        const parsedNote = JSON.parse(data);
        const filteredNotes = parsedNote.filter((note) => {
            return note.id !== idToDelete;
    })

    writeToFile(filteredNotes, './db/db.json');
        res.json({success: true})
    });
    

})
module.exports = note;
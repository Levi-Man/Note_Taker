const express = require('express');
const path = require('path');
const noteRoute = require('./routes/notes')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/notes', noteRoute);
app.use(express.static('public'));

const notes = [];

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  notes.push(newNote);
  res.json(newNote);
});

// app.delete('/api/notes/:id', (req, res) => {
//   const idToDelete = req.params.id;
//   // Implement logic to delete the note with the specified ID
//   console.log(idToDelete);
//   // req.splice(id=idToDelete);

//   res.json({ success: true });
// });


//GET route for homepage
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

//GET route for notes page
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET route for 404
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

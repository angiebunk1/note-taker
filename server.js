
const express = require('express');
const path = require('path');
const fs = require('fs');
const generateUniqueId = require('generate-unique-id');

const PORT = process.env.PORT || 3001;

const app = express();
const notes = require('./Develop/db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));




app.get('/api/notes', (req, res) => {
    try {
        const data = fs.readFileSync('./Develop/db/db.json', 'utf8');
        console.log(data)
        console.log(JSON.parse(data)); 
        res.json(JSON.parse(data))
      } catch (err) {
        res.json(err);
      }
});

app.post('/api/notes', (req, res) => {
    let data = {
        title: req.body.title,
        text: req.body.text,
        id: generateUniqueId()
    }
    notes.push(data)
    fs.writeFile('./Develop/db/db.json', JSON.stringify(notes), ()=>{
        res.json(data)
    })
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.delete('/api/notes/:id', (req, res) => {
    let remainingNotes = notes.filter(data => data.id != req.params.id);
    console.log(remainingNotes)
    fs.writeFile('./Develop/db/db.json', JSON.stringify(remainingNotes), ()=>{
        res.json(remainingNotes);
    })    
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
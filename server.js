
const express = require('express');
const path = require('path');
const fs = require('fs');
const generateUniqueId = require('generate-unique-id');

const app = express();
const notes = require('./Develop/db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));




app.get('/api/notes', (req, res) => {
    res.json(notes);
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




app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });
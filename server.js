const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const db= require("./Develop/db/db.json");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

app.use(express.urlencoded({ extended:false}));
app.use(express.json());

//makes the landing page static
app.use(express.static(path.join(__dirname,'/Develop/public')));

//gets the notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname,'Develop','public','notes.html')));

//gets saved notes
app.get('/api/notes',(req,res)=> {
  const saveFs = JSON.parse(fs.readFileSync('Develop/db/db.json',"utf8"));
  res.json(saveFs);
});


app.post('/api/notes',(req,res)=>{
   let newNote = req.body
   newNote.id = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
   const saveFs = JSON.parse(fs.readFileSync('db/db.json',"utf8"));
    saveFs.push(newNote);
    console.log(saveFs)
    fs.writeFileSync('Develop/db/db.json',JSON.stringify(saveFs));
    res.json(newNote)
});


app.delete('api/notes/:id',(req,res)=>{
const id = req.params.id;
id.delete(id);
fs.writeFileSync('Develop/db/db.json',JSON.stringify(db));
});


app.listen(PORT, () => console.log('Server started on PORT 3000'));

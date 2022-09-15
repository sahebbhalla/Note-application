const router = require("express").Router();
const { filterByQuery, findById, createNewNote, validateNote, deleteNote } = require("../../lib/notes");
const { notes } = require("../../db/db");
const { json } = require("express");

router.get("/notes", (req, res) => {
  let results = notes;

  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.delete("/notes/:id", (req, res) => {
  console.log(req.params.id);
  if (req.params.id) {
    const result = deleteNote(req.params.id,notes)
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post("/notes", (req, res) => {
  req.body.id = notes.length.toString();
 
  if (!validateNote(req.body)) {
    res.status(400).send("The Note is not properly formatted.");
  } else {
    const updatedNotes = createNewNote(req.body, notes);
    res.json(updatedNotes);
   }
});



module.exports = router;
const fs = require("fs");
const path = require("path");

function filterByQuery(query, notes) {
    let filteredResults = notes;
 
    if (query.id) {
        filteredResults = filteredResults.filter(note => note.id === query.id);
      }
    if (query.title) {
      filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.text) {
      filteredResults = filteredResults.filter(note => note.text === query.text);
    }
    return filteredResults;
  }
  
  function findById(id, notes) {
    const result = notes.filter(note => note.id === id)[0];
    return result;
  }
  function deleteNote(id,notes){
    console.log(notes);
    const updateArray = notes.filter(note=> note.id!==id)
    console.log(updateArray);
    // fs.writeFile('../db/db.json', '', function(){console.log('done')})
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({notes:  updateArray}, null, 2)
    );
    
    return updateArray;
  }
  
  function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({notes:  notesArray}, null, 2)
    );
    return note;
  }
  
  function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    return true;
  }
  module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote,
    deleteNote
  };
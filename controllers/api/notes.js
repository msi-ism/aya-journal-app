const Note = require('../../models/note')
const jwt = require('jsonwebtoken')
const { trusted } = require('mongoose');

module.exports = {
    create,
    getAllNotes,
    deleteNote
  };
  
  async function create(req, res) {
      try {
          // ^ add note to the database
      console.log('i c u')
      const note = await Note.create(req.body)
      console.log(`here ${note}`)
      // ^ sends token back to client as json
      res.json(note)
    } catch (error) {
      console.log(error)
      res.status(400).json(error)
    }
  }
  

  async function getAllNotes(req, res) {
    try {
      // ^ 
      const allNotes = await Note.find({})
      const data = res.json(allNotes)
      console.log("heres' your " + allNotes)
      if (!allNotes) throw new Error('Nope')
      return data
    } catch (error) {
      res.status(400).json("Can't get notes")
      
    }
  }
  

async function deleteNote(req, res) {
  try{
      console.log(req.params.id)
      await Note.findByIdAndRemove(req.params.id)
      const updatedNotes = await Note.find({})
      res.json(updatedNotes)
      
  }catch(e){
      console.log(e)
      res.status(400).json({ msg: e.message });
  }
}
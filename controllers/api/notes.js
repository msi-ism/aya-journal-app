const Note = require('../../models/note')
const jwt = require('jsonwebtoken')
const { trusted } = require('mongoose');

module.exports = {
    create,
    getAllNotes,
    deleteNote,
    editNote,
    getUsersNotes
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
      if (!allNotes) throw new Error('Nope')
      return data
    } catch (error) {
      res.status(400).json("Can't get notes")
      
    }
  }

  async function getUsersNotes(req, res) {
    try {
      // ^ 
      const usersNotes = await Note.find({username: req.params.loggedInUser})
      console.log(req.params.loggedInUser)
      const data = res.json(usersNotes)
      if (!usersNotes) throw new Error('Nope')
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

async function editNote(req, res) {
  console.log(req.body)
  try{
      const note = await Note.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" }
      )
      const updatedNotes = await Note.find({})
      res.status(200).json(updatedNotes)
  }catch(e){
      console.log(e)
      res.status(400).json({ msg: e.message });
  }
  
  }